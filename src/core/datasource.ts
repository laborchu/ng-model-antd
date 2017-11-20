export interface NgdsDataSource {
	getData: (params: any) => Promise<NgdsModel>;
}

export interface NgdsModel {
}