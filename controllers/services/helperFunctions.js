module.exports = {
    getFormattedCurrentDate: () => {
        const date = new Date(Date.now())
        const format = { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' }
        return date.toLocaleDateString('en-US', format)        
    }
}