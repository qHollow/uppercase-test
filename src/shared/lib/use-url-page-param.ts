export const useUrlParam = () => {
	const setUrlParam = (param: string, value: string) => {
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set(param, value);

		window.history.pushState({ path: newUrl.href }, "", newUrl.href);
	};

	const getUrlParam = (param: string, defaultValue: string) => {
		const searchParams = new URLSearchParams(window.location.search);
		return searchParams.get(param) || defaultValue;
	};

	return { setUrlParam, getUrlParam };
};
