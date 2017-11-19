export interface NgdsDataSource {
	getData: (params: any) => Promise<NgdsDsModel>;
}

export interface NgdsDsModel {
}