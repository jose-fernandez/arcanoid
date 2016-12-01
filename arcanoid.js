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
		this.bar=new block(160,460,80,10);
		this.bar.eventBar();
		//this.bar=new bar();

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
		this.rec= document.createElementNS ("http://www.w3.org/2000/svg", "rect");
		this.rec.setAttribute("x",`${this.x}`);
		this.rec.setAttribute("y",`${this.y}`);
		this.rec.setAttribute("width",`${this.w}`);
		this.rec.setAttribute("height",`${this.h}`);
		this.rec.setAttribute("fill", "white");

		document.getElementById("container").appendChild(this.rec);
	}
	eventBar(){
	var that=this;
	window.addEventListener("keydown",function(e){
		if(e.key=="ArrowRight")
			that.move(10,that);
		else if(e.key=="ArrowLeft")
			that.move(-10,that);
	});
	}
	move(e,x){
		if(this.x>0 && this.x<320){
			this.x+=e;
			this.rec.setAttribute("x",`${this.x}`);
		}else{
			if(this.rec.x.baseVal.value==0 && e.key=="ArrowRight"){
				this.x+=e;
				this.rec.setAttribute("x",`${this.x}`);
			}else if(this.x==320 && e.key=="ArrowLeft"){
				this.x+=e;
				this.rec.setAttribute("x",`${this.x}`);
			}
			
		}

	}
}

/*class bar{
	constructor(){
		this.build();
		this.event();
	}
	build(){
		this.pol= document.createElementNS ("http://www.w3.org/2000/svg", "polyline");
		this.pol.setAttribute("points",`150, 440, 200, 480, 250, 440`);//points=x,y;x,y;x,y
		this.pol.setAttribute("stroke", `black`);
		this.pol.setAttribute("stroke-width", 15);
		this.pol.setAttribute("fill", "none");
		this.pol.setAttribute("stroke-linejoin", "bevel");
		this.pol.setAttribute("stroke-linecap", "bevel");

		document.getElementById("container").appendChild(this.pol);
	}
	event(){
		var that=this;
		window.addEventListener("keydown",function(e){
			if(e.key=="ArrowRight")
				that.move(1,that);
			else if(e.key=="ArrowLeft")
				that.move(-1,that);
		});
	}
	move(e,x){
		console.log(x.pol.baseVal.value);
		x.pol.setAttribute("points",`150+${e}, 440, 200+${e}, 480, 250+${e}, 440`);
	}}*/


class controller{
	constructor(){
		this.game = new game(400,500);
	}
}


window.onload=function(){
	new controller();
};