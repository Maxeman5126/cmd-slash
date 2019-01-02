class CommandChannel {

    constructor(parent) {

        this.parent = parent;
        this.channelCurr = 0;
        this.channelPrev = 0;
        this.myZone = 0;

        this.parent.cmd.add(['ch', '초'], {
            '$none': () => {
                this.changeChannel(this.channelCurr + 1);
            },
            'b': () => {
                this.changeChannel(this.channelPrev);
            },
            'ㅠ': () => {
                this.changeChannel(this.channelPrev);
            },
            'list': () => {
                if (this.channelCurr > 20)
                    return;
                this.parent.mod.send('C_LIST_CHANNEL', 1, {
                    unk: 0,
                    zone: this.myZone
                });
                this.parent.mod.hookOnce('S_LIST_CHANNEL', 1, (e) => {
                    this.send(`This zone has ${e.channels.length} channel(s) in total.`);
                    return false;
                });
            },
            '$default': (num) => {
                if (!isNaN(num)) {
                    this.changeChannel(num);
                } else {
                    this.send(`Invalid argument. usage : ch [(num)|b|ㅠ|list]`);
                }
            }
        });

        this.installHooks();

    }

    destructor() {
        this.parent.cmd.remove(['ch', '초']);
        this.myZone - undefined;
        this.channelPrev = undefined;
        this.channelCurr = undefined;
        this.parent = undefined;
    }

    installHook(name, version, cb) {
        this.parent.mod.hook(name, version, cb);
    }

    installHooks() {
        this.installHook('S_CURRENT_CHANNEL', 2, (e) => {
            if (this.channelCurr !== e.channel) {
                this.channelPrev = this.channelCurr;
                this.channelCurr = e.channel;
            }
        });

        this.parent.mod.game.me.on('change_zone', (zone) => {
            this.myZone = zone;
            this.channelPrev = 0;
        });
    }

    changeChannel(num) {
        if (this.channelCurr > 20)
            return;
        switch (num) {
            case 0:
                num = 10;
                break;
            case (this.channelCurr):
                this.send(`Same channel selected.`);
                break;
            default:
                break;
        }
        num -= 1;
        this.parent.mod.send('C_SELECT_CHANNEL', 1, {
            unk: 1,
            zone: this.myZone,
            channel: num
        });
    }

    send(msg) { this.parent.cmd.message(': ' + msg); }

}

module.exports = CommandChannel;