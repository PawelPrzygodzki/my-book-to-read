const isExpiryDateInTheFuture = (token: { [key: string]: any }) => (
    Boolean(token.exp) && token.exp * 1000 > new Date().getTime()
);

export default isExpiryDateInTheFuture;
