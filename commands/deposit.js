module.exports = async (msg) => {
    let log;
    if(msg.platform === "discord") {
        log = msg.obj.reply;
    } else if (msg.platform === "slack") {
        log = async (data) => process.slackClient.postMessage(msg.obj.channel, data);
    }
    console.log('msg.sender',msg.sender);
    if (!(await process.core.users.getAddress(msg.sender))) {
        // await process.core.users.setAddress(msg.sender, await process.core.coin.createAddress(msg.sender));
        await process.core.coin.createAddress(msg.sender);
    }

    log("Your reusable address is " + await process.core.users.getAddress(msg.sender) + "!");
};
