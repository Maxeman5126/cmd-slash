'use strict';

class CommandDrop {

  constructor(parent) {

    this.command = parent.mod.command;

    // command
    parent.mod.command.add(['dr', 'drop', 'leave'], () => {
      parent.mod.send('C_LEAVE_PARTY', 1, {});
    });

  }

  destructor() {
    this.command.remove(['dr', 'drop', 'leave']);

    this.command = undefined;
  }

}

module.exports = CommandDrop;