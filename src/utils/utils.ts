/**
 * 配列の要素のインデックスをfrom→toに移動させて返す(非破壊)
 * @param original 元の配列
 * @param from
 * @param to
 * @returns 移動後の配列
 */

export const moveIndex = <T>(original: T[], from: number, to: number): T[] => {
	const arr = [...original];
	const target = arr[from];
	arr.splice(from, 1);
	arr.splice(to, 0, target);
	return arr;
};