# Martian Robots 

This task is developed by using NodeJS and Boostrap UI.

Input Information:
The first line of input is the upper-right coordinates of the rectangular world, the
lower-left coordinates are assumed to be 0, 0.
The remaining input consists of a sequence of robot positions and instructions (two lines
per robot). A position consists of two integers specifying the initial coordinates of the
robot and an orientation (N, S, E, W), all separated by whitespace on one line. A robot
instruction is a string of the letters "L", "R", and "F" on one line.

Sample input
```
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

Sample output
```
1 1 E
3 3 N LOST
2 3 S
```

## How to use
Install app  dependecies:
```
npm install
```
Run app locally:
```
npm start
```

Run with nodemon:
```
npm run dev
```

### Deployment

App is deployed in:

https://still-inlet-90387.herokuapp.com/


## To-do
- [ ] Persistnace layer
- [ ] Testing framework
- [ ] Insight
