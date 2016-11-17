class game{
	constructor(x, y){
		this.x=x;
		this.y=y;
		this.build();
		this.run();
	}
	build(){
		var bg= document.createElementNS ("http://www.w3.org/2000/svg", "svg");
		bg.setAttribute("height",`${this.x}`);
		bg.setAttribute("width",`${this.y}`);
		bg.setAttribute("id",`contenedor`);
		bg.setAttribute("fill", "grey");

		document.body.insertBefore(bg, document.getElementById("btn"));
	}
	run(){
		var that=this;
		setInterval((that.drawBalls),100);
	}

	drawBalls(){
		var list = document.getElementsByTagName("ellipse");
		for (let i=0;i<list.length;i++){
			list[i].calculateMove();
		}
	}
}

class circle{
	constructor(id, x,y,vx,vy){
		this.id=id;
		this.px=x;
		this.py=y;
		this.rx=10;
		this.ry=10;
		this.vx=vx;
		this.vy=vy;


		this.build();
	}

	build(){
		this.listColor=["blue","cyan", "GoldenRod", "green", "red", "magenta", "violet","orange"];
		this.pos=Math.floor(Math.random() * (6 - 0)) + 0;

		var cir= document.createElementNS ("http://www.w3.org/2000/svg", "ellipse");
		cir.setAttribute("cx",`${this.px}`);
		cir.setAttribute("cy",`${this.py}`);
		cir.setAttribute("rx",`${this.rx}`);
		cir.setAttribute("ry",`${this.ry}`);
		cir.setAttribute("stroke", `Dark${this.listColor[this.pos]}`);
		cir.setAttribute("stroke-width", 4);
		cir.setAttribute("fill", this.listColor[this.pos]);

		document.getElementById("contenedor").appendChild(cir);
	}

	calculateMove(x){
		var eli=document.getElementsByTagName("ellipse");
		if (this.py>290 || this.py<10){
			this.vy=this.vy*(-1);
			eli[this.id].setAttribute("rx",13);
			eli[this.id].setAttribute("ry",7);
		}else if(this.px>390 || this.px<10){
			this.vx=this.vx*(-1);
			eli[this.id].setAttribute("ry",13);
			eli[this.id].setAttribute("rx",7);
		}else{
			eli[this.id].setAttribute("rx",`${this.rx}`);
			eli[this.id].setAttribute("ry",`${this.ry}`);
		}
		this.px=this.px+this.vx;
		eli[this.id].setAttribute("cx",`${this.px}`);

		this.py=this.py+this.vy;
		eli[this.id].setAttribute("cy",`${this.py}`);
	}
}



function init(){
	var cont=0;
	document.getElementById("btn").addEventListener("click", function(){
		var rand=random();
		var cirObj=new circle(cont,rand[0],rand[1],rand[2],rand[3]);
		cont++;
	});
}

function random(){
	var x=Math.floor(Math.random() * (385 - 14)) + 14;
	var y=Math.floor(Math.random() * (285 - 14)) + 14;
	var vx=Math.floor(Math.random() * (7 - 1)) + 1;
	var vy=Math.floor(Math.random() * (7 - 1)) + 1;
	var list=[x,y,vx,vy];
	return list;
}



window.onload=function(){
	new game(400,300);
	init();
};