/**
 * Check all data and throw an error if a signature data is different
 *
 * @param expiresTimestamp can be 0 for no expired test
 * @param data Array of signature data to compare
 */
export const checkSignaturePartial = (
  expiresTimestamp: number,
  /** Data to compare */
  data: {
    /** Actual data */
    a: any;
    /** Expected data */
    b: any;
    /** Name of the comparison to display in the error */
    name: string;
  }[],
) => {
  if (expiresTimestamp && expiresTimestamp <= Math.floor(Date.now() / 1000)) {
    throw new Error(`The signature is expired`);
  }
  data.forEach(({ a, b, name }) => {
    if (a != b) {
      throw new Error(
        `The signature was not generated for the correct ${name}. ${a} is different from ${b}`,
      );
    }
  });
};
