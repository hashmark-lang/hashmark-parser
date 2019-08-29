/* This file was generated by Hashml https://github.com/hashml/hashml */
export interface Root {
    $tag: "root";
    children: (Block_)[];
}
export type Tag = BlockTag | InlineTag;
export type BlockTag = BlockRawHead | BlockRawBody | Block_default | Block_;
export type InlineTag = InlineCode | InlineStrong | InlineEmphasis | InlineTriplet | InlineRawFirstArg | InlineTag_ | InlineInline | InlineLink;
export interface BlockRawHead {
    $tag: "rawHead";
    children: (Block_)[];
    head: string;
}
export interface BlockRawBody {
    $tag: "rawBody";
    content: string[];
}
export interface Block_default {
    $tag: "_default";
    children: (Block_)[];
    head: (InlineTriplet | InlineStrong | InlineEmphasis | InlineInline | InlineCode | InlineRawFirstArg | InlineTag_ | InlineLink | string)[];
}
export interface Block_ {
    $tag: "*";
    children: (Block_)[];
    head: (InlineTriplet | InlineStrong | InlineEmphasis | InlineInline | InlineCode | InlineRawFirstArg | InlineTag_ | InlineLink | string)[];
}
export interface InlineCode {
    $tag: "code";
    content: string;
}
export interface InlineStrong {
    $tag: "strong";
    content: (InlineTriplet | InlineStrong | InlineEmphasis | InlineInline | InlineCode | InlineRawFirstArg | InlineTag_ | InlineLink | string)[];
}
export interface InlineEmphasis {
    $tag: "emphasis";
    content: (InlineTriplet | InlineStrong | InlineEmphasis | InlineInline | InlineCode | InlineRawFirstArg | InlineTag_ | InlineLink | string)[];
}
export interface InlineTriplet {
    $tag: "triplet";
    first: (InlineTriplet | InlineStrong | InlineEmphasis | InlineInline | InlineCode | InlineRawFirstArg | InlineTag_ | InlineLink | string)[];
    second: (InlineTriplet | InlineStrong | InlineEmphasis | InlineInline | InlineCode | InlineRawFirstArg | InlineTag_ | InlineLink | string)[];
    third: (InlineTriplet | InlineStrong | InlineEmphasis | InlineInline | InlineCode | InlineRawFirstArg | InlineTag_ | InlineLink | string)[];
}
export interface InlineRawFirstArg {
    $tag: "rawFirstArg";
    first: string;
    second: (InlineTriplet | InlineStrong | InlineEmphasis | InlineInline | InlineCode | InlineRawFirstArg | InlineTag_ | InlineLink | string)[];
}
export interface InlineTag_ {
    $tag: "tag\\";
    arg: (InlineTriplet | InlineStrong | InlineEmphasis | InlineInline | InlineCode | InlineRawFirstArg | InlineTag_ | InlineLink | string)[];
}
export interface InlineInline {
    $tag: "inline";
    arg: (InlineTriplet | InlineStrong | InlineEmphasis | InlineInline | InlineCode | InlineRawFirstArg | InlineTag_ | InlineLink | string)[];
}
export interface InlineLink {
    $tag: "link";
    url: URL;
    title: (InlineTriplet | InlineStrong | InlineEmphasis | InlineInline | InlineCode | InlineRawFirstArg | InlineTag_ | InlineLink | string)[];
}
