export class BlockError {
	constructor(readonly message: string, readonly colStart: number, readonly colEnd: number) {}
}
