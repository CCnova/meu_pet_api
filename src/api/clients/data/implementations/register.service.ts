import { encrypt } from "../../../../utils";
import { IInsertClientsDatabaseClient } from "../../infra/contracts/insert.dbclient";
import { RegisterError } from "../../models";
import { IRegisterClientService } from "../contracts";

export const createInstance: IRegisterClientService.TRegisterClientServiceConstructor =
  (clientsDatabase: IInsertClientsDatabaseClient) => {
    return {
      async execute(dto: IRegisterClientService.TRegisterClientUserDTO) {
        try {
          // Todo(CCNova): Add business rules validations
          const { password: uncryptedPassword } = dto;
          const encryptedPassword = await encrypt(uncryptedPassword);

          return clientsDatabase.insertOne({
            ...dto,
            password: encryptedPassword,
          });
        } catch (error) {
          console.log("An error occurred while trying to register user", error);

          return new RegisterError();
        }
      },
    };
  };
