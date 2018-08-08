function failOn(method) {
  return () => {
    jest.spyOn(console, method).mockImplementation(error => {
      throw new Error(error);
    });
  };
}

export const failOnConsoleError = failOn('error');
export const failOnConsoleWarn = failOn('warn');

export default {
  failOnConsoleError,
  failOnConsoleWarn,
};
