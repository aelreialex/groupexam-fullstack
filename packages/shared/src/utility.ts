export const optimizeImage = (
	url?: string | null,
	width: number = 800,
): string => {
	if (!url) return "";
	if (!url.includes("/upload/")) return url;

	return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
};
