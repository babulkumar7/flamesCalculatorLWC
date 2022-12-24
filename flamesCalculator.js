import { LightningElement, track } from 'lwc';
export default class FlamesCalculator extends LightningElement { 
  
  countarray;
  yourname = '';
  lettername;
  finalvalue;
  @track currentStep = '0';
  crushname = '';
  finalimage =[];
  yournameHandler(ev) {
    this.currentStep = '0';
    this.yourname = ev.target.value.toLowerCase();
    this.finalimage =[];
    this.finalvalue = '';
    let vyourname = this.template.querySelector(".yourName");
    let yournameval = vyourname.value;
    if (yournameval.length > 1) {
      vyourname.setCustomValidity("");
    } else {
      vyourname.setCustomValidity("Enter more than two character");
    }
    vyourname.reportValidity();
  }
  CrushnameHandler(ev) {
    this.currentStep = '0';
    this.crushname = ev.target.value.toLowerCase();
    this.finalimage =[];
    this.finalvalue = '';
    let vname = this.template.querySelector(".CrushName");
    let crushnameval = vname.value;
    if (crushnameval.length > 1) {
      vname.setCustomValidity("");
    } else {
      vname.setCustomValidity("Enter more than two character");
    }
    vname.reportValidity();
  }

  calculate() {
    if(this.yourname !== ''&& this.crushname !==''){
    this.countarray = this.removecommonletter(this.yourname, this.crushname);
    this.lettername = this.finalresultmethod(this.countarray);
    this.finalvalue = this.finalmethod(this.lettername);
    this.finalimage = this.getimage(this.finalvalue);
    console.log('this.finalimage'+JSON.stringify(this.finalimage));
    }
  }
  getimage(flamename){
   let images =  this.images.filter(flam => flam.label == flamename);

    return images;
  }
  finalmethod(lettername) {
    const flames = ['Friendship', 'Love', 'Affection', 'Marriage', 'Enemy', 'Siblings', 'Both are Same Name '];
    var filtered = flames.filter(flam => flam.startsWith(lettername.toUpperCase()));
    var setprocess = flames.indexOf(filtered.toString());
    setprocess = setprocess + 1;
    this.currentStep = setprocess.toString();
    return filtered.toString();
  }

  removecommonletter(ynamet, cnamet) {
    var yname = ynamet.replaceAll(" ", "");
    var cname = cnamet.replaceAll(" ", "");

    let resultA = yname.split('').filter((elem) => cname.indexOf(elem) == -1).join('');
    let resultB = cname.split('').filter((elem) => yname.indexOf(elem) == -1).join('');
    let name = resultA.split('');
    let syname = resultB.split('');
    const finalname = [...syname, ...name];

    return finalname;
  }

  finalresultmethod(countarray) {
    if (countarray.length > 1) {
      var flames = "FLAMES";
      let c = 0;
      let l = 1;
      for (let i = 0; flames.length != 1; i++) {
        if (l == countarray.length) {
          if (c >= flames.length) {
            c = 0;
          }
          let arr = flames.split('').filter(item => item !== flames[c]).join('');
          flames = arr;
          l = 1;
        }
        if (c >= flames.length) {
          c = 0;
        }
        l++;
        c++;
      }
    }
    if (countarray.length == 1) {
      flames = 'S';
    }
    if (countarray.length == 0) {
      flames = "B";
    }
    return flames;
  }

  images = [
    {
      label: "Marriage",
      icon: 'https://img.indiafilings.com/learn/wp-content/uploads/2018/07/12005804/Haryana-Marriage-Registration.jpg'
    },
    {
      label: "Affection",
      icon: 'https://images.pexels.com/photos/371285/pexels-photo-371285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      label: "Love",
      icon: 'https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
    },

    {
      label: "Friendship",
      icon: 'https://c4.wallpaperflare.com/wallpaper/12/400/6/love-wallpaper-preview.jpg'
    },
    {
      label: "Enemy",
      icon: 'https://c4.wallpaperflare.com/wallpaper/890/64/33/fighting-fists-fire-hand-fist-bump-illustration-wallpaper-preview.jpg'
    },
    {
      label: "Siblings",
      icon: 'https://cdn.pixabay.com/photo/2015/06/22/08/38/siblings-817369_960_720.jpg'
    }
  ]
}