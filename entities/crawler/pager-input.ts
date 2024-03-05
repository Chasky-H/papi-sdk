export interface PagerCrawlerInput {
    /**
     * The name of the crawler action.
     */
    Name: string;

    /**
     * Used in multi-Crawler to define execution order.
     */
    BlockID?: string;

    /**
     * The URL to the pager handler.
     */
    PagerRelativeURL: string;

    /**
     * The type of the crawl.
     */
    Type: 'Pager';

    /**
     * Data that will be sent to the pager.
     */
    PagerData: { [key: string]: unknown };
}

export interface PagerInput {
    /**
     * The key of the next page in the pager response, first will always be undefined.
     */
    PageKey: string | undefined;

    /**
     * Deconstruction of PagerData.
     */
    [key: string]: unknown;
}

export interface PagerOutput {
    /**
     * A key that can be used to mark the working page of the pager,
     * will be sent in next request as {@link PagerInput:PageKey}.
     *
     * If undefined, the crawler will stop calling the pager.
     */
    NextPageKey: string | undefined;
}
