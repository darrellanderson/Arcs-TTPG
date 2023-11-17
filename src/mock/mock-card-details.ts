import { CardDetails } from "@tabletop-playground/api";

export type MockCardDetailsParams = {
    index?: number;
    stackIndex?: number;
    templateId?: string;
    name?: string;
    metadata?: string;
    textureOverrideURL?: string;
    flipped?: boolean;
    tags?: string[];
};

export class MockCardDetails implements CardDetails {
    readonly index: number = 0;
    readonly stackIndex: number = 0;
    readonly templateId: string = "";
    readonly name: string = "";
    readonly metadata: string = "";
    readonly textureOverrideURL: string = "";
    readonly flipped: boolean = false;
    readonly tags: string[] = [];

    constructor(params?: MockCardDetailsParams) {
        if (typeof params?.index === "number") {
            this.index = params.index;
        }
        if (typeof params?.stackIndex === "number") {
            this.stackIndex = params.stackIndex;
        }
        if (typeof params?.templateId === "string") {
            this.templateId = params.templateId;
        }
        if (typeof params?.name === "string") {
            this.name = params.name;
        }
        if (typeof params?.metadata === "string") {
            this.metadata = params.metadata;
        }
        if (typeof params?.textureOverrideURL === "string") {
            this.textureOverrideURL = params?.textureOverrideURL;
        }
        if (typeof params?.flipped === "boolean") {
            this.flipped = params.flipped;
        }
        if (params?.tags) {
            this.tags = params.tags;
        }
    }
}

export { MockCardDetails as CardDetails };
