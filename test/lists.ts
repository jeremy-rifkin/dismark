import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
    it("should handle lists", () => {
        expect.soft(parser.parse("- foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("-foo")).to.deep.equal({
            content: [
                {
                    content: "-foo",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo - bar")).to.deep.equal({
            content: [
                {
                    content: "foo - bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("1. foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: 1,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("2. foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: 2,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("1. 2. 3. foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    items: [
                                        {
                                            content: [
                                                {
                                                    items: [
                                                        {
                                                            content: [
                                                                {
                                                                    content: "foo",
                                                                    type: "plain",
                                                                },
                                                            ],
                                                            type: "doc",
                                                        },
                                                    ],
                                                    start_number: 3,
                                                    type: "list",
                                                },
                                            ],
                                            type: "doc",
                                        },
                                    ],
                                    start_number: 2,
                                    type: "list",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: 1,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("- foo\n- bar")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo\n",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                        {
                            content: [
                                {
                                    content: "bar",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("- foo\n1. bar")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo\n",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                        {
                            content: [
                                {
                                    content: "bar",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("   -   foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("- - - - foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    items: [
                                        {
                                            content: [
                                                {
                                                    items: [
                                                        {
                                                            content: [
                                                                {
                                                                    items: [
                                                                        {
                                                                            content: [
                                                                                {
                                                                                    content: "foo",
                                                                                    type: "plain",
                                                                                },
                                                                            ],
                                                                            type: "doc",
                                                                        },
                                                                    ],
                                                                    start_number: null,
                                                                    type: "list",
                                                                },
                                                            ],
                                                            type: "doc",
                                                        },
                                                    ],
                                                    start_number: null,
                                                    type: "list",
                                                },
                                            ],
                                            type: "doc",
                                        },
                                    ],
                                    start_number: null,
                                    type: "list",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("- foo\n  - bar")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo\n",
                                    type: "plain",
                                },
                                {
                                    items: [
                                        {
                                            content: [
                                                {
                                                    content: "bar",
                                                    type: "plain",
                                                },
                                            ],
                                            type: "doc",
                                        },
                                    ],
                                    start_number: null,
                                    type: "list",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("- foo\n bar")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo\nbar",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("-   foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("- foo\n  bar1\n   bar2\n    bar3\n     bar4")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo\nbar1\n bar2\n  bar3\n   bar4",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("-   foo\n  bar1\n   bar2\n    bar3\n     bar4")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo\nbar1\nbar2\nbar3\n bar4",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("0. foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: 1,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("-1. foo")).to.deep.equal({
            content: [
                {
                    content: "-1. foo",
                    type: "plain",
                },
            ],
            type: "doc",
        });
    });
});
