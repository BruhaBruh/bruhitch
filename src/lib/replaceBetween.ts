export const replaceBetween = function (str: string, start: number, end: number, content: string) {
	return str.substring(0, start) + content + str.substring(end);
};
