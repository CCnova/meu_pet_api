import { IPetDatabase } from "@meu-pet/pet/contracts";
import {
  TListUserPetsDTO,
  TListUserPetsResult,
  TListUserPetsUseCase,
} from "../contracts";

export default function makeListUserPetsUseCase(dependencies: {
  petRepository: IPetDatabase;
}): TListUserPetsUseCase {
  return async function (dto: TListUserPetsDTO): Promise<TListUserPetsResult> {
    const result = await dependencies.petRepository.list({
      ownerId: dto.userId,
    });

    return result;
  };
}
