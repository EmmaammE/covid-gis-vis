export interface Iconfig {
  port: number | string;
  redis: {
    host: string;
    port: number | string;
  };
}

export interface IStorage {
  get: (list_name: string) => string[];
  add: (list_name: string, item: string) => boolean;
  remove: (list_name: string, item: string) => boolean;
}
