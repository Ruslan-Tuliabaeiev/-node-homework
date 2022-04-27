const path = require('path');
const fs = require('fs/promises');
const User = require('../../repository/users');

class localStorage {
    constructor(file, user) {
        this.file = file;
        this.user = user;
        this.static = process.env.STATIC_FOLDER;
    }

    async saveAvatar() {
        const distanation = path.join(this.static, 'avatars', this.user.id);
        await fs.mkdir(distanation, { recursive: true });
        await fs.rename(this.file.path, path.join(distanation, this.file.filename));
        const urlOfAvatar = path.normalize(path.join(this.user.id, this.file.filename));
        await User.updateAvatar(this.user.id, urlOfAvatar);
        return urlOfAvatar;
    }

}

module.exports = localStorage;

