export class RegisteUserDTO {
	email: string;
	password: string;
	nickname: string;
}
export class UserLoginDTO {
	email: string;
	password: string;
}
export class ValidatorEmailDTO {
	email: string;
}
export class ValidatorNicknameDTO {
	nickname: string;
}
export class UpdateProfileDTO {
	nickname: string;
	password: string;
	updatePassword: string;
}
export class WithdrawUserDTO {
	email: string;
}
