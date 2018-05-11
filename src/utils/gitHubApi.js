module.exports = {
    getToken() {
        return `f52a6f1f251864a0cc335475da81eafe2294b284`
    },

    getLabels(vue) {
        return vue.$http.get(`https://api.github.com/repos/${vue.$store.getters.repo}/labels`, {
            headers: {
                "Authorization": `token ${this.getToken()}`
            }
        })
    },
    getGitHubUser(vue) {
        return vue.$http.get(`https://api.github.com/users/${vue.$store.getters.gitHubUsername}`, {
            headers: {
                "Authorization": `token ${this.getToken()}`
            }
        })
    },
    getUserInfo(vue) {
        return vue.$http.all([this.getGitHubUser(vue), this.getLabels(vue)])
    },
    getIssues(vue, data) {
        let label = ''
        if (data.label && data.label.trim().length > 0) {
            label = `+label:"${data.label}"`
        }

        return vue.$http.get(`https://api.github.com/search/issues?q=${data.keyword}+state:open+repo:${vue.$store.getters.repo}${label}&sort=created&order=desc&page=${data.currentPage}&per_page=${data.pageSize}`, {
            headers: {
                'Accept': 'application/vnd.github.v3.html',
                "Authorization": `token ${this.getToken()}`
            }
        })
    },
    getIssue(vue, number) {
        return vue.$http.get(`https://api.github.com/repos/${vue.$store.getters.repo}/issues/${number}`, {
            headers: {
                'Accept': 'application/vnd.github.v3.html',
                "Authorization": `token ${this.getToken()}`
            }
        })
    },
    getComments(vue, url) {
        return vue.$http.get(url, {
            headers: {
                'Accept': 'application/vnd.github.v3.html',
                "Authorization": `token ${this.getToken()}`
            }
        })
    },
    getReadme(vue) {
        return vue.$http.get(`https://raw.githubusercontent.com/${vue.$store.getters.repo}/master/README.md`, {
            headers: {
                'Accept': 'application/vnd.github.v3.html',
                "Authorization": `token ${this.getToken()}`
            }
        })
    },
    getAccessToken(vue, code) {
        const auth = vue.$store.getters.auth
        return vue.$http.post(auth.proxy, {
            code,
            client_id: auth.clientID,
            client_secret: auth.clientSecret
        }, {
            headers: {
                'Accept': 'application/json'
            }
        })
    },
    addComment(vue, url, comment) {
        return vue.$http.post(url, {
            body: comment
        }, {
            headers: {
                Authorization: `token ${vue.$store.getters.accessToken}`
            }
        })
    }
}