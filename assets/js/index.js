var Typer = {
  text: "",
  index: 0,
  speed: 80,
  file: "rudnikleandro.html",
  accessCount: 0,
  deniedCount: 0,

  init: function () {
    setInterval(this.updLstChr.bind(this), 500);
    $.get(this.file, (data) => {
      this.text = data.slice(0, -1);
      this.startTyping();
    });
  },

  startTyping: function () {
    const timer = setInterval(() => {
      this.addText({ keyCode: 123748 });
      if (this.index >= this.text.length) clearInterval(timer);
    }, 30);
  },

  content: function () {
    return $("#console").html();
  },

  write: function (str) {
    $("#console").append(str);
  },

  addText: function (key) {
    if (key.keyCode === 18) this.accessCount++;
    else if (key.keyCode === 20) this.deniedCount++;
    else if (key.keyCode === 27) this.hidepop();

    if (this.accessCount >= 3) this.makeAccess();
    if (this.deniedCount >= 3) this.makeDenied();
    
    if (this.text) {
      if (this.content().endsWith("|")) {
        $("#console").html(this.content().slice(0, -1));
      }
      this.index += (key.keyCode === 8 && this.index > 0) ? -this.speed : this.speed;
      $("#console").html(this.text.substring(0, this.index).replace(/\n/g, "<br/>"));
      window.scrollBy(0, 50);
    }

    if (key.preventDefault && key.keyCode !== 122) key.preventDefault();
    if (key.keyCode !== 122) key.returnValue = false;
  },

  updLstChr: function () {
    if (this.content().endsWith("|")) {
      $("#console").html(this.content().slice(0, -1));
    } else {
      this.write("|");
    }
  },

  replaceUrls: function (text) {
    const httpIndex = text.indexOf("http://");
    const spaceIndex = text.indexOf(".me ", httpIndex);
    if (spaceIndex !== -1) {
      const url = text.slice(httpIndex, spaceIndex - 1);
      return text.replace(url, `<a href="${url}">${url}</a>`);
    }
    return text;
  },
};

Typer.init();
