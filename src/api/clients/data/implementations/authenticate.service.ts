import { compare } from "../../../../utils";
import { IFindClientsDatabaseClient } from "../../infra/contracts/find.dbclient";
import { AuthenticationError } from "../../models";
import { IAuthenticateClientService } from "../contracts";

export const createInstance: IAuthenticateClientService.TRegisterClientServiceConstructor =
  (clientsDatabase: IFindClientsDatabaseClient) => {
    return {
      async execute(dto) {
        const user = await clientsDatabase.findOne({ email: dto.email });
        if (!user)
          //Todo(CCNova): Do not throw errors, define a error response
          return new AuthenticationError();

        const isPasswordCorrect = await compare(dto.password, user.password);
        if (!isPasswordCorrect)
          //Todo(CCNova): Do not throw errors, define a error response
          return new AuthenticationError();

        return user;
      },
    };
  };
