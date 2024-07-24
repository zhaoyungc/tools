let ls_item_key_name = "__chat_local_token_checking_";

function getToken() {
    const lsKey = localStorage.getItem(ls_item_key_name);
    return lsKey;
}

function setToken(token) {
    localStorage.setItem(ls_item_key_name, token);
}

export default {
    getToken,
    setToken,
};