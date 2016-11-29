class game{
	constructor(x, y){
		var cont=0;
		this.bool=true;
		this.x=x;
		this.y=y;
		this.list=[];
		this.build();
		this.createElements();
	}
	build(){
		var bg= document.createElementNS ("http://www.w3.org/2000/svg", "svg");
		bg.setAttribute("height",`${this.y}`);
		bg.setAttribute("width",`${this.x}`);
		bg.setAttribute("id",`container`);
		bg.style.backgroundColor="grey";

		document.getElementById("arcanoid").appendChild(bg);
	}
	createElements(){
		this.ball=new ball(200,450,2,1,10);
		//this.bar=new block(160,462,80,10); Traditional way
		this.bar=new bar();

		for (let i=10;i<106;i+=19){
			for(let j=10;j<335;j+=54){
				this.list.push(new block(j,i, 50,15));
			}
		}		
	}

}

class ball{
	constructor(cx,cy,vx,vy,r){
		this.cx=cx;
		this.cy=cy;
		this.r=r;
		this.vx=vx;
		this.vy=vy;
/*Cálculo de 8 puntos
for (let grad=0; grad<360; grad+=45) {
	var p_x = self.bolas[i].r * Math.cos(grad) + self.bolas[i].x;
	var p_y = self.bolas[i].r * Math.cos(grad) + self.bolas[i].y;
}*/

		this.build();
	}

	build(){
		var cir= document.createElementNS ("http://www.w3.org/2000/svg", "circle");
		cir.setAttribute("cx",`${this.cx}`);
		cir.setAttribute("cy",`${this.cy}`);
		cir.setAttribute("r",`${this.r}`);
		cir.setAttribute("stroke", `black`);
		cir.setAttribute("stroke-width", 2);
		cir.setAttribute("fill", "white");

		document.getElementById("container").appendChild(cir);
	}

	calculateMove(x){
		var eli=document.getElementsByTagName("ellipse");
		if(this.py>(x.y-(this.ry+this.st)) && this.px<(0+this.rx+this.st) ||
			this.py>(x.y-(this.ry+this.st)) && this.px>(x.x-(this.rx+this.st))|| 
			this.py<(0+this.ry+this.st) && this.px>(x.x-(this.rx+this.st)) ||
			this.py<(0+this.ry+this.st) && this.px<(0+this.rx+this.st)){
				eli[this.id].setAttribute("rx",`${this.rx}`);
				this.rx=10;
				this.vx=this.vx*(-1);
				eli[this.id].setAttribute("ry",`${this.ry}`);
				this.ry=10;
				this.vy=this.vy*(-1);

		}else if (this.py>(x.y-(this.ry+this.st)) || this.py<(0+this.ry+this.st)){
			this.vy=this.vy*(-1);
			eli[this.id].setAttribute("rx",13);
			this.rx=13;
			eli[this.id].setAttribute("ry",7);
			this.ry=7;
		}else if(this.px>(x.x-(this.rx+this.st)) || this.px<(0+this.rx+this.st)){
			this.vx=this.vx*(-1);
			eli[this.id].setAttribute("ry",13);
			this.ry=13;
			eli[this.id].setAttribute("rx",7);
			this.rx=7;
		}else{
			eli[this.id].setAttribute("rx",`${this.rx}`);
			this.rx=10;
			eli[this.id].setAttribute("ry",`${this.ry}`);
			this.ry=10;
		}
		this.px=this.px+this.vx;
		eli[this.id].setAttribute("cx",`${this.px}`);

		this.py=this.py+this.vy;
		eli[this.id].setAttribute("cy",`${this.py}`);
	}
}

class block{
	constructor(x,y,w,h){
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
		this.build();
	}
	build(){
		var rec= document.createElementNS ("http://www.w3.org/2000/svg", "rect");
		rec.setAttribute("x",`${this.x}`);
		rec.setAttribute("y",`${this.y}`);
		rec.setAttribute("width",`${this.w}`);
		rec.setAttribute("height",`${this.h}`);
		rec.setAttribute("stroke", `black`);
		rec.setAttribute("stroke-width", 2);
		rec.setAttribute("fill", "white");

		document.getElementById("container").appendChild(rec);
	}
}

class bar{
	constructor(){
		this.build();
	}
	build(){
		var pol= document.createElementNS ("http://www.w3.org/2000/svg", "polyline");
		pol.setAttribute("points",`150, 440, 200, 480, 250, 440`);//points=x,y;x,y;x,y
		pol.setAttribute("stroke", `black`);
		pol.setAttribute("stroke-width", 15);
		pol.setAttribute("fill", "none");
		pol.setAttribute("stroke-linejoin", "bevel");
		pol.setAttribute("stroke-linecap", "bevel");

		document.getElementById("container").appendChild(pol);
	}
}

class controller{
	constructor(){
		this.game = new game(400,500);
	}
}


window.onload=function(){
	new controller();
};