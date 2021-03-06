/// <reference path="types/index.ts" />

import renderAtom from "./atom1";
import renderJSON from "./json";
import renderRSS from "./rss2";

export class Feed {
  options: FeedOptions;
  items: Item[] = [];
  categories: string[] = [];
  contributors: Author[] = [];
  namespaces: any = {};
  elements: any[] = [];
  extensions: Extension[] = [];

  constructor(options: FeedOptions) {
    this.options = options;
  }

  public addItem = (item: Item) => this.items.push(item);

  public addCategory = (category: string) => this.categories.push(category);

  public addContributor = (contributor: Author) => this.contributors.push(contributor);

  public addExtension = (extension: Extension) => this.extensions.push(extension);

  /**
   * Returns a Atom 1.0 feed
   */
  public atom1 = (): string => renderAtom(this);

  /**
   * Returns a RSS 2.0 feed
   */
  public rss2 = (): string => renderRSS(this);

  /**
   * Returns a JSON1 feed
   */
  public json1 = (): string => renderJSON(this);
}

export function ifTruePush(data: any, array: any) {
  if (data) {
    if (data.isCdata) {
      Object.keys(data).forEach(function (key) {
        if (key !== 'isCdata') {
          data = {};
          data[key] = { _cdata: data[key] };
        }
      });
    }
    array.push(data);
  }
}

export function ifTruePushArray(dataArray: any[] | undefined, array: any) {
  if (!dataArray) {
    return;
  }

  dataArray.forEach(function (item) {
    ifTruePush(item, array);
  });
}