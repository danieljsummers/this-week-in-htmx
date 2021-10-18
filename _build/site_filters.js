
module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter('_chatlog', text => {
        //
        const blocks = []
        let currentBlock = ''
        for (const line of text.split('\n')) {
            if (line.startsWith('  ')) {
                currentBlock += '\n' + line.substring(2)
            } else {
                blocks.push(currentBlock)
                currentBlock = line
            }
        }
        if (blocks[0] == '') blocks.shift()

        blocks.forEach((block, i) => {
            blocks[i] = block
                .replace(/^((?:[^:]|\\:)*):/m, ' <b>$1</b>')
                .replace(/^--- (.*) ---/m, ' <i class="stage-direction">$1</i>')
                .replace(/\[(\p{So})(\d+)\]/gu, 
                    '<span class="reaction"><span class="emoji">$1</span> $2</span>')
        })

        return blocks.join('\n\n')
    })
    
    eleventyConfig.addFilter('discordUrl', url => {
        if (url.startsWith('http')) return url
        return 'https://discordapp.com/channels/' + url
    })
}
