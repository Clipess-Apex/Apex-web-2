export const getHost = () => {
    const host = window.location.protocol + "//" + window.location.host;
    return host;
}