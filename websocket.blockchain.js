const API_BITCOIN = "ws://ws.blockchain.info/inv";
const ADDRESS_BITCOIN = "18aG8yG853axF4PdGjuAxePRieN6RbvS6a";
var blockChainSocket = new WebSocket(API_BITCOIN);
blockChainSocket.onopen = function(e) {
    console.log("block chain connected");
    blockChainSocket.send(JSON.stringify({"op":"addr_sub", "addr": ADDRESS_BITCOIN}));
};

blockChainSocket.onmessage = function(message) {
    try {
        var response = JSON.parse(message.data);
        var getOuts = response.x.out;
        var countOuts = getOuts.length;
        var amount = response.x.out[0].value;
        var calAmount = amount/100000000;
        document.getElementById('waitingBTC').innerHTML = "RECEIVED: " + calAmount + " BTC";
        console.log(response);
    } catch (e) {
        console.log(e);
    }
};