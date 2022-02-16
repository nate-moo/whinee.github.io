colors = {
    "github": "110, 84, 148",
    "twitter": "29, 161, 242",
    "anilist": "18, 39, 94",
    "discord": "95, 125, 201",
    "reddit": "252, 5, 5",
}

function home() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://kv.whi-ne.workers.dev?key=wh_projects", false);
    xhr.send(null);
    items = JSON.parse(xhr.response);

    stats_dict = {
        "stars": "/stargazers",
        "watching": "/watchers",
        "issues": "/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc",
        "forks": "/network/members"
    }

    var main = document.getElementById("list");
    for (var i of items) {
        var div = document.createElement("div");
        var ta = document.createElement("a");
        var h3 = document.createElement("h3");
        var h4 = document.createElement("h4");
        var links = document.createElement("div");
        var ls = document.createElement("span");
        var stats = document.createElement("div");
        var ss = document.createElement("span");
        var tags = document.createElement("div");

        ta.href = i["links"]["repo"];
        h3.innerText = i["name"];
        ta.append(h3);
        h4.innerText = i["desc"];

        links.setAttribute("class", "rps");
        ls.innerText = "Links: ";
        links.append(ls);
        Object.entries(i["links"]).forEach(function ([k, v]) {
            var link = document.createElement("div");
            var a = document.createElement("a");
            link.setAttribute("class", "rd-pill");
            a.setAttribute("target", "_blank");
            a.href = v;
            a.innerText = k;
            link.append(a);
            links.append(link);
        });

        stats.setAttribute("class", "rps");
        ss.innerText = "Stats: ";
        stats.append(ss);
        Object.entries(stats_dict).forEach(function ([sk, sv]) {
            var stat = document.createElement("div");
            var a = document.createElement("a");
            var img = document.createElement("img");

            stat.setAttribute("class", "rd-pill");
            stat.setAttribute("title", sk);
            img.setAttribute("class", "rpi");
            img.src = `assets/images/icons/${sk}.png`;
            a.setAttribute("target", "_blank");
            a.setAttribute("class", "ss");
            a.href = i["links"]["repo"] + sv;
            a.innerText = i[sk];
            stat.append(img, a);
            stats.append(stat);
        });

        tags.setAttribute("class", "rps");
        for (var j of i["tags"]) {
            var tag = document.createElement("div");
            tag.setAttribute("class", "rd-pill");
            tag.innerText = j;
            tags.append(tag);
        }

        div.append(
            ta,
            h4,
            document.createElement("hr"),
            links,
            stats,
            document.createElement("hr"),
            tags
        );
        main.append(div);
    }
}

window.onload = function () {
    var str = ""

    Object.entries(colors).forEach(function ([k, v]) {
        str = str.concat(`#icons01 .${k} button:hover {
            background-color: rgb(${v}) !important;
            -webkit-box-shadow: 0px 15px 20px rgba(${v}, 0.4);
            box-shadow: 0px 15px 20px rgba(${v}, 0.4);
        }`)
    });
    const style = document.querySelector("#style");
    style.innerHTML = str;
    window[location.href.split("/").pop().split(".")[0]]();
}
