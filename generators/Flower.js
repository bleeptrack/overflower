class Flower{
    

    constructor(colored,box,w,h,hat, colorArr, shuffle, par){
         
        this.colored = colored;
        this.box = box;
        this.w = w;
        this.h = h;
        this.hat = hat;
        
        this.colorArr = colorArr;
        console.log(this.colorArr);
        this.params = par;
        if(par.length == 0){
            this.newParams = true;
        }else{
            this.newParams = false;
        }
        
        
        this.names = [];
        this.paramCount = 0;
        
        //number of leaves
        var nrLeaves;
        
        /*if(this.box){
            nrLeaves = this.rnd(30,70);
        }else{*/
            
        nrLeaves = this.rnd(27,32);//rnd(13,30);
        //}
        console.log("nrleaves: "+nrLeaves);
        
        
        
           
        this.color11 = new Color(this.rndHidden(0,100)/100,this.rndHidden(0,100)/100,this.rndHidden(0,100)/100);
        this.color12 = new Color(this.rndHidden(0,100)/100,this.rndHidden(0,100)/100,this.rndHidden(0,100)/100);
        this.color21 = new Color(this.rndHidden(0,100)/100,this.rndHidden(0,100)/100,this.rndHidden(0,100)/100);
        this.color22 = new Color(this.rndHidden(0,100)/100,this.rndHidden(0,100)/100,this.rndHidden(0,100)/100);
        
        if(this.colorArr.length == 0){
            colorArr.push(this.color11);
            colorArr.push(this.color12);
            colorArr.push(this.color21);
            colorArr.push(this.color22);
        }
        
            //if(this.colorArr.length > 0){
            
            /*var colorarr = [
                //new Color(0,1,242/255),
                //new Color(1,0,114/255),         //pink
                //new Color(102/255,0,49/255),    //dark pink
                //new Color(0,74/255,102/255)     //dark blue2
                new Color(6/255,57/255,76/255),
                new Color(12/255,67/255,131/255),
                new Color(34/255,160/255,182/255),
                new Color(106/255,151/255,184/255),
                new Color(123/255,19/255,70/255),
                new Color(203/255,12/255,89/255),
                new Color(235/255,100/255,158/255),
                new Color(7/255,30/255,38/255)
            ];*/
            
                console.log("S: "+shuffle);
                if(shuffle){
                    console.log("SHUFFLE");
                    this.shuffle(this.colorArr);
                    
                    
                    /*this.color11 = this.colorArr[0];
                    this.color12 = this.colorArr[1];
                    this.color21 = this.colorArr[2];
                    this.color22 = this.colorArr[3];*/
                }    
                
                
                
                
            //}
            
            this.gradient1 = this.calcGradient(this.colorArr[0], this.colorArr[1], nrLeaves);
            this.gradient2 = this.calcGradient(this.colorArr[2], this.colorArr[3], nrLeaves);
            
        
        
        console.log("Create Center");
        //circle radius
        var r = this.rnd(15,30);
        
        //calc boxed center no matter what, so parameter is generated
        this.center = new Point(this.rnd(2*r,w-2*r),this.rnd(2*r,h-2*r));
        
        if(box){
            this.outerrect = new Path.Rectangle(0,0,w,h);
            this.rect = new Rectangle(5,5,w-10,h-10);
            if(!this.colored){
                this.outerrect.strokeColor = 'black';
            }

            this.rectPath = new Path.Rectangle(this.rect);
            this.rectPath.strokeColor = 'black';
            if(this.colored){
                //this.rectPath.fillColor = this.gradient1[0];
                this.rectPath.strokeColor = this.gradient2[0];
                this.rectPath.strokeWidth = 5;
            }
        }else{
            this.center = new Point(this.w/2,this.h/2);
        }


        //var circlePath = new Path.Circle(new Point(rnd(w-2*r),rnd(h-2*r)),r);
        var circlePath = new Path.Circle(this.center,r);
        circlePath.strokeColor = 'black';
        if(this.colored){
            circlePath.fillColor = this.gradient1[0];
            circlePath.strokeColor = this.gradient2[0];
            circlePath.strokeWidth = 5;
        }

        
        this.leaves = [circlePath];
        this.complete = [circlePath];
        this.lines = [];

        this.generateLeaves(circlePath, nrLeaves);
        
        if(this.box){
            var cutted =  this.rectCut(this.rectPath,this.leaves);
            this.leaves = this.leaves.concat(cutted);
            var cuttedLines = this.cutLines(this.lines);
            this.lines = this.lines.concat(cuttedLines);
        }
        
        if(this.colored){
            //this.rectPath.sendToBack();
        }
    }
    
move(vec){
    for(var i = 0; i<this.leaves.length; i++){
        this.leaves[i].translate(vec);
    }
    /*for(var i = 0; i<this.complete.length; i++){
        this.complete[i].translate(vec);
    }*/
    for(var i = 0; i<this.lines.length; i++){
        this.lines[i].translate(vec);
    }
    if(this.box){
        this.outerrect.translate(vec);
        this.rectPath.translate(vec);
    }
    
}

remove(){
    for(var i = 0; i<this.leaves.length; i++){
        this.leaves[i].remove();
    }
    for(var i = 0; i<this.lines.length; i++){
        this.lines[i].remove();
    }
    
    if(this.box){
        this.outerrect.remove();
        this.rectPath.remove();
    }
}

generateLeaves(circlePath, nrLeaves){
    
    var angle = 222;
    var offset = circlePath.length * (angle/360);
    
    var leaveFaktor = 8;
    var wid = this.rnd(3,7)
    var leaveWidth = circlePath.length/wid;
    
    var position = 0;
    
    var handleFaktor = (0.4 + this.rnd(0,wid+5)/10);
    var handleLength = 30//rnd(20,200);
    var leaveLength = 30//rnd(30,150);
    
    for(var i = 0; i<nrLeaves; i++){
        
       
        //var handleLength = 40;
        
        //console.log("GEN LEAVE "+i);
       
        position = (position+offset)%circlePath.length; 
        
        var p1 = circlePath.getPointAt(position);
        var pm = circlePath.getPointAt((position + leaveWidth/2)%circlePath.length);
        var p2 = circlePath.getPointAt((position + leaveWidth)%circlePath.length);
        
        var n1 = circlePath.getNormalAt(position);
        var nm = circlePath.getNormalAt((position + leaveWidth/2)%circlePath.length);
        var n2 = circlePath.getNormalAt((position + leaveWidth)%circlePath.length);
        
        
        var path = new Path();
        path.add(new Segment(p1,new Point(0,0),n1.multiply(handleLength)));
        path.add(pm.add(nm.multiply(leaveLength)));
        path.add(new Segment(p2, n2.multiply(handleLength), new Point(0,0)));
        
        if(this.colored){
            path.fillColor = this.gradient1[i];
            path.strokeColor = this.gradient2[i];
            path.strokeWidth = 4;
        }else{
            path.strokeColor = 'black';
        }
        path.closed = true;
        
        
        
        
        
        leaveLength += leaveFaktor;
        handleLength = leaveLength * handleFaktor;
        
        
        var finishedLeave = this.cutLeave(this.complete, path, nm, false);
        
        this.fill(path,i, nm);
        finishedLeave.sendToBack();
        this.leaves.push(finishedLeave);
        
        
        
        this.complete.push(path);
        
        
    }
    
}

fill(path, leaveNr, nm){
    
    var choose = this.rnd(1,8);
    
    //console.log("FILL "+i+" WITH "+choose);
    
    switch(choose){
        case 1:
            //triangle
            var hatch = this.rnd(1,2)==1;
            var f = this.fillTriangle(path);
            
            var finishedFill = this.cutLeave(this.complete,f,nm, false);
            if(finishedFill != null){
                if(this.colored){
                    finishedFill.strokeColor = this.gradient2[leaveNr];
                    finishedFill.sendToBack();
                    finishedFill.strokeWidth = 2;
                }else{
                    finishedFill.strokeColor = 'black';
                }
                this.leaves.push(finishedFill);
                
                if(hatch){
                    this.lines = this.lines.concat(this.hatchfill(finishedFill,this.hat, leaveNr));
                }
            }
            break;
        case 2: 
             var tip = path.segments[1].point;
    
            var leaveSize = this.center.subtract( tip );
            leaveSize = leaveSize.length;
             
            for(var i = 0; i<this.rnd(3,leaveSize*2); i++){
                var c = this.miniCircle(path);
                
                var finishedFill = this.cutLeave(this.complete,c,nm, true);
                
                if(finishedFill != null){
                    if(this.colored){
                        finishedFill.strokeColor = this.gradient2[leaveNr];
                        finishedFill.fillColor = this.gradient2[leaveNr];
                        finishedFill.strokeWidth = 2;
                        finishedFill.sendToBack();
                    }else{
                        finishedFill.strokeColor = 'black';
                    }
                    this.leaves.push(finishedFill);
                }
                
            }
            break;
        case 3:
            var mode = this.rnd(0,2);
            var l = this.littleLines(path, mode == 0);
            for(var i = 0; i<l.length; i++){
                var finishedFill = this.cutLeave(this.complete,l[i],nm, true);
                if(finishedFill != null){
                    if(this.colored){
                        finishedFill.strokeColor = this.gradient2[leaveNr];
                        finishedFill.fillColor = this.gradient2[leaveNr];
                        finishedFill.strokeWidth = 2;
                        finishedFill.sendToBack();
                    }else{
                        finishedFill.strokeColor = 'black';
                    }
                    this.leaves.push(finishedFill);
                }
            }
            break;
        case 4:    
            //leaf form
            var f = this.fillLine(path);
            for(var i = 0; i<f.length; i++){
                var hatch = this.rnd(1,2)==1;
                var finishedFill = this.cutLeave(this.complete,f[i],nm, false);
                this.leaves.push(finishedFill);
                if(finishedFill != null){
                    if(this.colored){
                        finishedFill.strokeColor = this.gradient2[leaveNr];
                        finishedFill.sendToBack();
                        finishedFill.strokeWidth = 2;
                    }else{
                        finishedFill.strokeColor = 'black';
                    }
                    if(hatch){
                        this.lines = this.lines.concat(this.hatchfill(finishedFill,this.hat, leaveNr));
                    }
                }
            }
            break;
        
        case 5:
            var l = this.middleLine(path);
            var hatch = this.rnd(1,3)<3;
            for(var i = 0; i<l.length; i++){
                var finishedFill = this.cutLeave(this.complete,l[i],nm, false);
                if(finishedFill != null){
                    if(this.colored){
                        finishedFill.strokeColor = this.gradient2[leaveNr];
                        finishedFill.sendToBack();
                        finishedFill.strokeWidth = 2;
                    }else{
                        finishedFill.strokeColor = 'black';
                    }
                    this.leaves.push(finishedFill);
                    if(hatch){
                        this.lines = this.lines.concat(this.hatchfill(finishedFill,this.hat, leaveNr));
                    }
                }
            }
            break;
        case 6:
            var l = this.zigzag(path);
            var hatch = this.rnd(1,3)<3;
            for(var i = 0; i<l.length; i++){
                var finishedFill = this.cutLeave(this.complete,l[i],nm, false);
                if(finishedFill != null){
                    if(this.colored){
                        finishedFill.strokeColor = this.gradient2[leaveNr];
                        finishedFill.sendToBack();
                        finishedFill.strokeWidth = 2;
                    }else{
                        finishedFill.strokeColor = 'black';
                    }
                    this.leaves.push(finishedFill);
                    if(hatch){
                        this.lines = this.lines.concat(this.hatchfill(finishedFill,this.hat, leaveNr));
                    }
                }
            }
            break;
        case 7:
            
            var l = this.circleLine(path);
            var hatch = this.rnd(1,3)<3;
            for(var i = 0; i<l.length; i++){
                var finishedFill = this.cutLeave(this.complete,l[i],nm, false);
                if(finishedFill != null){
                    if(this.colored){
                        finishedFill.strokeColor = this.gradient2[leaveNr];
                     
                        finishedFill.strokeWidth = 2;
                        finishedFill.sendToBack();
                    }else{
                        finishedFill.strokeColor = 'black';
                    }
                    this.leaves.push(finishedFill);
                    if(hatch){
                        this.lines = this.lines.concat(this.hatchfill(finishedFill,this.hat, leaveNr));
                    }
                }
            }
            break;
        case 8:
            var l = this.bigCircles(path);
            var hatch = this.rnd(1,3)<3;
            for(var i = 0; i<l.length; i++){
                var finishedFill = this.cutLeave(this.complete,l[i],nm, false);
                if(finishedFill != null){
                    if(this.colored){
                        finishedFill.strokeColor = this.gradient2[leaveNr];
                      
                        finishedFill.strokeWidth = 2;
                        finishedFill.sendToBack();
                    }else{
                        finishedFill.strokeColor = 'black';
                    }
                    this.leaves.push(finishedFill);
                    if(hatch){
                        this.lines = this.lines.concat(this.hatchfill(finishedFill,this.hat, leaveNr));
                    }
                }
            }
            break;
            
    }
    
    
}

hatchfill(path, dist, leaveNr){
    if(this.colored){
        path.strokeColor = this.gradient2[leaveNr] 
        path.fillColor = this.gradient2[leaveNr];
        return [];
    }else{
        var rect = path.bounds;
        var lines = [];
        for(var i = -rect.height; i<=rect.width; i+=dist){
            var hyp = Math.sqrt(rect.height*rect.height + rect.height*rect.height);
            var line = new Path(rect.point.add( new Point(i,0) ), rect.point.add( new Point(rect.height,rect.height).add( new Point(i,0) ) ) );
            //line.strokeColor = 'black';
            var intersections = line.getIntersections(path);
            
            for(var x = 1; x<intersections.length; x+=2){
                var line2 = new Path(intersections[x-1].point,intersections[x].point);
                line2.strokeColor = 'black';
                lines.push(line2);
                
            }
            line.remove();
        }
        return lines;
    }
}

cutLines(lines){
    var cutted = [];
    for(var i = 0; i<lines.length; i++){
        if(lines[i].intersects(this.rectPath)){
           
            var inter = lines[i].getIntersections(this.rectPath);
            var l1 = lines[i].splitAt(inter[0]);
          
            //console.log(l1.firstSegment.point);
            if(l1.firstSegment.point.x<9 || l1.firstSegment.point.y<9){
                lines[i].remove();
                if(this.colored){
                    l1.strokeColor = this.gradient2[i];
                }else{
                    l1.strokeColor = 'black';
                }
                cutted.push(l1);
            }else{
                l1.remove();
            }
        }else if(!lines[i].isInside(this.rect)){
            lines[i].remove();
        }
    }
    return cutted;
}

miniCircle(leave){
        
      
        var cent = new Point(this.rnd(leave.bounds.x, leave.bounds.x+leave.bounds.width), this.rnd(leave.bounds.y, leave.bounds.y+leave.bounds.height));
  
        /*while(!leave.contains(cent)){
            cent = new Point(this.rnd(leave.bounds.x, leave.bounds.x+leave.bounds.width), this.rnd(leave.bounds.y, leave.bounds.y+leave.bounds.height));
        }*/
        var shape = new Path.Circle(cent, 2);
        var finish = shape.intersect(leave);
        
        shape.remove();
        return finish;
    
}

bigCircles(leave){
    var lines = [];
    var start = leave.getPointAt(this.rnd(0,leave.length));
    var r = this.rnd(10,50);
    var weight = this.rnd(5,15);
    var dist = this.rnd(15,30);
    var nr = this.rnd(1,4);
    
    for(var i = 0; i<nr; i++){
        var outer = new Path.Circle(start,r+weight);
        var inner = new Path.Circle(start,r);
        var cut = outer.subtract(inner);
        var finished = cut.intersect(leave);
        finished.strokeColor = 'black';
        lines.push(finished);
        outer.remove();
        inner.remove();
        cut.remove();
        r = r+weight+dist;
    }
    return lines;
}

middleLine(leave){
    var lines = [];
    var s1 = leave.lastSegment;
    var s2 = leave.firstSegment;
    var s3 = leave.segments[1];
    var p = new Path();
    
    p.add(leave.segments[1].point);
    p.add(this.center);

    
    
    var r = 40;
    var add = 10;
    var dist = 15;
    for(var i = 0; i<p.length; i += r*2+dist){
        var c = new Path.Circle(p.getPointAt(i),r);
        c.strokeColor = 'black';
        
        r -= add;
        if(r<2){
            r=2;
        }
        
        var finish = c.intersect(leave);
        finish.strokeColor = 'black';
        lines.push(finish);
        c.remove();
    }
    p.remove();
    return lines;
}


// |_|_|_|
littleLines(leave, regular){
    var lines = [];
    
    var tip = leave.segments[1].point;
    var tipPos = leave.getOffsetOf(tip);
    
    var leaveSize = this.center.subtract( tip );

    
    var lgth = leaveSize.length / 20;//rnd(5,25);
    if(regular){
        var dist = 5;
    }else{
        var dist = this.rnd(10,25);
    }
    
    for(var i = tipPos-dist; i>=0; i-=dist){
        var position = leave.getPointAt(i); 
        var norm = leave.getNormalAt(i);
        var p2 = leave.getPointAt(i+1);
    
        var path = new Path();
        path.add(position);
        if(regular){
            path.add(position.subtract( norm.multiply( this.rnd(5,lgth) ) ) );
        }else{
            path.add(position.subtract( norm.multiply(lgth) ) );
        }
        path.add(p2);
        path.closed = true;
        
        var finish = path.intersect(leave);
        finish.strokeColor = 'black';
        lines.push(finish);
        path.remove();
    }
    
    for(var i = tipPos+dist; i<leave.length; i+=dist){
        var position = leave.getPointAt(i); 
        var norm = leave.getNormalAt(i);
        var p2 = leave.getPointAt(i-1);
    
        var path = new Path();
        path.add(position);
        if(regular){
            path.add(position.subtract( norm.multiply( this.rnd(5,lgth) ) ) );
        }else{
            path.add(position.subtract( norm.multiply(lgth) ) );
        }
        path.add(p2);
        path.closed = true;
        
        var finish = path.intersect(leave);
        finish.strokeColor = 'black';
        lines.push(finish);
        path.remove();
    }
    return lines;
}

circleLine(leave){
    var lines = [];
    
    var s1 = leave.lastSegment;
    var s2 = leave.firstSegment;
    var s3 = leave.segments[1];
    var p = new Path();
    p.add(leave.segments[0]);
    p.add(leave.segments[1]);
    p.add(leave.segments[2]);
    p.add(this.center)
   
    p.scale(0.6);
    p.strokeColor = 'black';
    
    var tip = p.segments[1].point;
    var tipPos = p.getOffsetOf(tip);
    var leaveSize = this.center.subtract( tip );
    var dist = leaveSize.length / 10;
    
    for(var i = tipPos; i>0; i-=dist){
        if(p.getPointAt(i) != null){
            var c = new Path.Circle(p.getPointAt(i),dist/3);
            c.strokeColor = 'black';
            lines.push(c);
        }
        //console.log(p.getPointAt(i));
    }
    
    for(var i = tipPos+dist; i<leave.length; i+=dist){
        if(p.getPointAt(i) != null){
            var c = new Path.Circle(p.getPointAt(i),dist/3);
            c.strokeColor = 'black';
            lines.push(c);
        }
        //console.log(p.getPointAt(i));
    }
    
    p.remove();
    return lines;
}

zigzag(leave){
    var lines = [];
    var uni = new Path();
    uni.strokeColor = 'black';

    var tip = leave.segments[1].point;
    var tipPos = leave.getOffsetOf(tip);
    
    var leaveSize = this.center.subtract(tip);

    
    var lgth = leaveSize.length / 10 + this.rnd(0,10)-5;//rnd(5,25);
    var dist = leaveSize.length / 30 + this.rnd(0,7);//nd(5,25);
    
    for(var i = tipPos; i-dist*2>=0; i-=dist*2){
        var p = leave.getPointAt(i);
        var p2 = leave.getPointAt(i-dist);
        var n2 = leave.getNormalAt(i-dist);
        var p3 = leave.getPointAt(i-dist-dist);
        
        var path = new Path();
        path.add(p);
        path.add(p2.subtract( n2.multiply(lgth) ) );
        path.add(p3);
        path.closed = true;
        
        var tmp = uni.unite(path, false);
        uni.remove();
        uni = tmp;
        
        path.remove();
        
    }
    
    for(var i = tipPos; i+dist*2<leave.length; i+=dist*2){
        var p = leave.getPointAt(i);
        var p2 = leave.getPointAt(i+dist);
        var n2 = leave.getNormalAt(i+dist);
        var p3 = leave.getPointAt(i+dist+dist);
        
        var path = new Path();
        path.add(p);
        path.add(p2.subtract( n2.multiply(lgth) ) );
        path.add(p3);
        path.closed = true;
        
        
        var tmp = uni.unite(path, false);
        uni.remove();
        uni = tmp;
        path.remove();
       
    }
    var tmp = uni.intersect(leave);
    uni.remove();
    
    tmp.strokeColor = 'black';
    return [tmp];
}

fillTriangle(leave){
    var s1 = leave.lastSegment;
    var s2 = leave.firstSegment;
    var s3 = leave.segments[1];
    var p = new Path();
    p.add(leave.segments[0].point);
    p.add(leave.segments[1].point);
    p.add(leave.segments[2].point);
    p.add(this.center)
    p.closed = true;
    //p.scale(0.9, center);
    p.strokeColor = 'black';
    return p;
}

fillLine(leave){
    
    var r = this.rnd(1,3);
    var paths = [];
    
    
    for(var i = 1; i<=r; i++){
        var s1 = leave.lastSegment;
        var s2 = leave.firstSegment;
        var s3 = leave.segments[1];
        var p = new Path();
        p.add(leave.segments[0]);
        p.add(leave.segments[1]);
        p.add(leave.segments[2]);
        p.add(this.center)
        p.closed = true;
        p.scale(1-(0.1*i), this.center);
        p.strokeColor = 'black';
        paths.push(p);
    }
    
    var finishedPaths = [];
    for(var i = 1; i<paths.length; i+=2){
        var erg = paths[i-1].subtract(paths[i]);
        erg.strokeColor = 'black';
        paths[i].remove();
        paths[i-1].remove();
        finishedPaths.push(erg);
    }
    if(paths.length%2==1){
        finishedPaths.push(paths[paths.length-1]);
    }
    
    
    return finishedPaths;
}



cutLeave(complete, l, n, fill){
    //console.log('start');
    var leave = l;
    for(var i = complete.length-1; i>=0; i--){
        //console.log(i);
        if(complete[i].intersects(l)){
            //console.log('jo');
        
            var stance = complete[i].clone();
            //stance.scale(1.1);
            var newleave = leave.subtract(stance);
            if(fill){
                newleave.fillColor = 'black';
            }
            leave.remove();
            leave = newleave;
            stance.remove();
            l.remove();
        }else if(complete[i].contains(leave.position)){
            leave.fillColor = 'black';
            leave.remove();
            return null;
        }
    }
    
    //
    //console.log(leave.firstSegment.point);
    return leave;
}

rectCut(rectPath, paths){
    
    var cutted = [];
    for(var i = 0; i<paths.length; i++){
        if(paths[i].intersects(rectPath)){
            var cut = paths[i].intersect(rectPath);
            paths[i].remove();
            //cut.strokeColor = 'black';
            cut.sendToBack();
            cutted.push(cut);
        }else if(!paths[i].isInside(rectPath.bounds)){
            paths[i].remove();
        }
    }
    return cutted;
}

  	calcGradient(color1, color2, nbr){
        
        var c11 = color1.red;
        var c12 = color1.green;
        var c13 = color1.blue;
        
        var c21 = color2.red;
        var c22 = color2.green;
        var c23 = color2.blue;
        
        var s1 = 0;
        var s2 = 0;
        var s3 = 0;
        
        s1 = (c21-c11)/nbr;
        s2 = (c22-c12)/nbr;
        s3 = (c23-c13)/nbr;
        var colors = Array();
        for(var i = 0; i<=nbr; i++){
            // console.log(c11 + s1*i, c12 + s2*i, c13 + s3*i);
            colors[i] = new Color((c11 + s1*i), c12 + s2*i, c13 + s3*i);
        }
        
        //return shuffleArray(colors);
        return colors;
    }
    
    //from https://ux.stackexchange.com/questions/82056/how-to-measure-the-contrast-between-any-given-color-and-white
    calcContrast(c1,c2){
        var R1 = (c1.red <= 0.03928) ? c1.red/12.92 : Math.pow(((c1.red + 0.055)/1.055), 2.4);
        var G1 = (c1.green <= 0.03928) ? c1.green/12.92 : Math.pow(((c1.green + 0.055)/1.055), 2.4);
        var B1 = (c1.blue <= 0.03928) ? c1.blue/12.92 : Math.pow(((c1.blue + 0.055)/1.055), 2.4);
        
        var R2 = (c2.red <= 0.03928) ? c2.red/12.92 : Math.pow(((c2.red + 0.055)/1.055), 2.4);
        var G2 = (c2.green <= 0.03928) ? c2.green/12.92 : Math.pow(((c2.green + 0.055)/1.055), 2.4);
        var B2 = (c2.blue <= 0.03928) ? c2.blue/12.92 : Math.pow(((c2.blue + 0.055)/1.055), 2.4);
        
        var L1 = (0.2126 * R1 + 0.7152 * G1 + 0.0722 * B1);
        var L2 = (0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2);
        
        return (Math.max(L1, L2) + 0.05)/(Math.min(L1, L2) + 0.05);
    }
    
    //shuffle array
    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    
    rnd(min, max){
        
        if(this.newParams){
           
            var p = Math.floor(Math.random() * (max - min + 1)) + min;
            this.params.push(p);
            return p;
        }else{
            if( typeof(this.params[this.paramCount]) === undefined ){
                console.log(this.paramCount+": "+this.params[this.paramCount]);
            }
            var p = this.params[this.paramCount];
            this.paramCount++;
            return p;
        }
    } 
    
    rndHidden(min, max){
           
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } 

}





