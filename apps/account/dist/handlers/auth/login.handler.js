import config from "@peekaboo-ssr/config/account";
import { createPacketS2G } from "@peekaboo-ssr/utils";
import databaseManager from "@peekaboo-ssr/classes/DatabaseManager";
import userCommands from "@peekaboo-ssr/commands/userCommands";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
const loginRequestHandler = async (socket, clientKey, payload) => {
  try {
    console.log("loginRequestHandler............");
    const { id, password } = payload;
    const user = await userCommands.findUser(databaseManager, id);
    if (!user || user.password !== password) {
      const payloadData2 = {
        globalFailCode: 3,
        userId: "none",
        token: "none"
      };
      const packet2 = createPacketS2G(
        config.clientPacket.account.LoginResponse,
        clientKey,
        payloadData2
      );
      socket.write(packet2);
      throw new Error(`\uBE44\uBC00\uBC88\uD638\uAC00 \uB9DE\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`);
    }
    const userId = !user.uuid ? await userCommands.createUserUuid(databaseManager, id, uuidv4()) : user.uuid;
    const token = jwt.sign({ id }, config.jwt.key, {
      expiresIn: config.jwt.expiresIn
    });
    const payloadData = {
      globalFailCode: 0,
      userId,
      token
    };
    const packet = createPacketS2G(
      config.clientPacket.account.LoginResponse,
      clientKey,
      payloadData
    );
    socket.write(packet);
  } catch (e) {
    console.error(e);
  }
};
export {
  loginRequestHandler
};
//# sourceMappingURL=login.handler.js.map
