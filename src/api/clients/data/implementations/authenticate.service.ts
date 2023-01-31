import { compare } from "../../../../utils";
import { IFindClientUserRespository } from "../../infra/contracts";
import { AuthenticationError } from "../../models";
import { IAuthenticateClientService } from "../contracts";

export const createInstance: IAuthenticateClientService.TRegisterClientServiceConstructor =
  (findClientUserRepository: IFindClientUserRespository) => {
    return {
      async execute(dto) {
        const user = await findClientUserRepository.findOne({
          email: dto.email,
        });
        if (!user) return new AuthenticationError();

        const isPasswordCorrect = await compare(dto.password, user.password);
        if (!isPasswordCorrect) return new AuthenticationError();

        return user;
      },
    };
  };
