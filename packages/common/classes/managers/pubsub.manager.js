class PubSubManager {
  constructor(redisManager) {
    this.publisher = redisManager.getPublisherClient();
    this.subscriber = redisManager.getSubscriberClient();
  }

  sendAndWaitForResponse(
    requestChannel,
    responseChannel,
    message,
    timeout = 5000,
  ) {
    return new Promise((resolve, reject) => {
      let timeoutHandler;
      let isResolved = false;

      const unsubscribeChannel = (channel) => {
        this.subscriber.unsubscribe(channel, (err) => {
          if (err) console.error(`Unsubscribe error: ${err}`);
          else console.log(`Unsubscribed from ${channel}`);
        });
      };

      const handleResponse = (channel, responseMessage) => {
        if (channel === responseChannel && !isResolved) {
          isResolved = true;
          const response = JSON.parse(responseMessage);
          unsubscribeChannel(responseChannel);
          clearTimeout(timeoutHandler);
          resolve(response);
        }
      };

      // `once`를 사용하여 이벤트 리스너 자동 제거
      this.subscriber.once('message', handleResponse);

      // 응답 채널 구독
      this.subscriber.subscribe(responseChannel, (err) => {
        if (err) {
          reject(
            new Error(
              `Failed to subscribe to ${responseChannel}: ${err.message}`,
            ),
          );
        } else {
          console.log(`Subscribed to ${responseChannel}`);
        }
      });

      // 요청 메시지 발송
      this.publisher.publish(requestChannel, JSON.stringify(message), (err) => {
        if (err) {
          reject(
            new Error(
              `Failed to publish message to ${requestChannel}: ${err.message}`,
            ),
          );
        } else {
          console.log(`Published to ${requestChannel}:`, message);
        }
      });

      // 타임아웃 설정
      timeoutHandler = setTimeout(() => {
        if (!isResolved) {
          isResolved = true;
          unsubscribeChannel(responseChannel);
          reject(new Error(`Response timed out after ${timeout}ms`));
        }
      }, timeout);
    });
  }
}

export default PubSubManager;
