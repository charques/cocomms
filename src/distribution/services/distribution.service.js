exports.distribute = async function (distributionType, communication) {
    console.log("distribute communication " + distributionType + ": " + JSON.stringify(communication));
    return true;
}