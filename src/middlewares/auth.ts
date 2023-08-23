export function auth(req, res, next) {
	// 너무 광범히하니 tokenAuth
	try {
		const token = req.headers.authorization;
		if (!token) {
			throw Error('토큰이 없습니다.');
		}
		// 프론트에서 access키를 알아야 한다. 요청을 해야한다. userID +token
		// 세션과 api는 다르다. 프론트에서 처리하는게 어떨까? (프론트에서 관리..?)
		next();
		// 검증은 나중에..
	} catch (error) {
		next(error);
	}
}
