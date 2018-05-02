module.exports = {
    getToken(vue) {
        let headers;
        return headers = { "Authorization": "token 675638b9fa0af7cc4e84a80f8e5cae2c00fd6a99" }
    },

    getLabels(vue) {
        console.log(this.getToken())
        return vue.$http.get(`https://api.github.com/repos/${vue.$store.getters.repo}/labels`, {
            headers: {
                "Authorization": "token 675638b9fa0af7cc4e84a80f8e5cae2c00fd6a99"
            }
        })
    },
    getGitHubUser(vue) {
        return vue.$http.get(`https://api.github.com/users/${vue.$store.getters.gitHubUsername}`, {
            headers: {
                "Authorization": "token 675638b9fa0af7cc4e84a80f8e5cae2c00fd6a99"
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
                "Authorization": "token 675638b9fa0af7cc4e84a80f8e5cae2c00fd6a99"
            }
        })
    },
    getIssue(vue, number) {
        return vue.$http.get(`https://api.github.com/repos/${vue.$store.getters.repo}/issues/${number}`, {
            headers: {
                'Accept': 'application/vnd.github.v3.html',
                "Authorization": "token 675638b9fa0af7cc4e84a80f8e5cae2c00fd6a99"
            }
        })
    },
    getComments(vue, url) {
        return vue.$http.get(url, {
            headers: {
                'Accept': 'application/vnd.github.v3.html',
                "Authorization": "token 675638b9fa0af7cc4e84a80f8e5cae2c00fd6a99"
            }
        })
    },
    getReadme(vue) {
        return vue.$http.get(`https://raw.githubusercontent.com/${vue.$store.getters.repo}/master/README.md`, {
            headers: {
                'Accept': 'application/vnd.github.v3.html',
                "Authorization": "token 675638b9fa0af7cc4e84a80f8e5cae2c00fd6a99"
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