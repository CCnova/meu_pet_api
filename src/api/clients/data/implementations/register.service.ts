import { encrypt } from "../../../../utils";
import { ICreateClientUserRepository } from "../../infra/contracts";
import { RegisterError } from "../../models";
import { IRegisterClientService } from "../contracts";

export const createInstance: IRegisterClientService.TRegisterClientServiceConstructor =
  (createClientUserRepo: ICreateClientUserRepository) => {
    return {
      async execute(dto: IRegisterClientService.TRegisterClientUserDTO) {
        try {
          // Todo(CCNova): Add business rules validations
          const { password: uncryptedPassword } = dto;
          const encryptedPassword = await encrypt(uncryptedPassword);

          return createClientUserRepo.createOne({
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
