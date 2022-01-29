use std::{collections::HashMap, ops::Not, time::Instant};

use itertools::Itertools;

pub fn main() {
    let year = 2015;
    let day = 07;
    println!("Aoc Year {} Day: {:02}", year, day);
    let mut t: Instant;

    let input = std::fs::read_to_string(format!("../input/{}/{:02}.txt", year, day)).unwrap();
    dbg!(&input[..5]);
    let list = parse(&input);
    dbg!(&list[..2]);

    t = Instant::now();
    let res = solve_part1(&list);
    dbg!(t.elapsed().as_millis());
    dbg!(&res);

    t = Instant::now();
    let res2 = solve_part2(&list);
    dbg!(t.elapsed().as_millis());
    dbg!(&res2);

    //46065
    // 14134
}

pub fn solve_part1(input: &Vec<Operation>) -> String {
    let mut wires: HashMap<String, u16> = HashMap::new();

    let mut it = input.into_iter().cycle();

    loop {
        let op = it.next().unwrap();
        let i1: Option<u16> = op
            .input1
            .parse::<u16>()
            .ok()
            .or(wires.get(&op.input1).map(|x| *x));
        let mut i2: Option<u16> = None;
        if op.input2.is_some() {
            let si2 = op.input2.as_ref().unwrap();
            i2 = si2.parse::<u16>().ok().or(wires.get(si2).map(|x| *x));
        }

        if i1.is_none() {
            continue;
        }
        match &op.instruction {
            Instruction::ASSIGN => {
                wires.insert(op.output.clone(), i1.unwrap());
                if op.output == "a" {
                    break;
                }
            }
            Instruction::NOT => {
                wires.insert(op.output.clone(), i1.unwrap().not());
            }
            _ => {
                if i2.is_none() {
                    continue;
                }
            }
        }
        match &op.instruction {
            Instruction::AND => {
                wires.insert(op.output.clone(), i1.unwrap() & i2.unwrap());
            }
            Instruction::OR => {
                wires.insert(op.output.clone(), i1.unwrap() ^ i2.unwrap());
            }
            Instruction::LSHIFT => {
                wires.insert(op.output.clone(), i1.unwrap() << i2.unwrap());
            }
            Instruction::RSHIFT => {
                wires.insert(op.output.clone(), i1.unwrap() >> i2.unwrap());
            }
            _ => {}
        }
    }

    wires.get("a").unwrap_or(&9).to_string()
}

pub fn solve_part2(input: &Vec<Operation>) -> String {
    let mut wires: HashMap<String, u16> = HashMap::new();

    let mut it = input.into_iter().cycle();

    loop {
        let op = it.next().unwrap();
        let mut i1: Option<u16> = op
            .input1
            .parse::<u16>()
            .ok()
            .or(wires.get(&op.input1).map(|x| *x));
        let mut i2: Option<u16> = None;
        if op.input2.is_some() {
            let si2 = op.input2.as_ref().unwrap();
            i2 = si2.parse::<u16>().ok().or(wires.get(si2).map(|x| *x));
        }

        if i1.is_none() {
            continue;
        }
        match &op.instruction {
            Instruction::ASSIGN => {
                if op.output == "b" {
                    i1 = Some(solve_part1(&input).parse::<u16>().unwrap());
                }
                wires.insert(op.output.clone(), i1.unwrap());
                if op.output == "a" {
                    break;
                }
            }
            Instruction::NOT => {
                wires.insert(op.output.clone(), i1.unwrap().not());
            }
            _ => {
                if i2.is_none() {
                    continue;
                }
            }
        }
        match &op.instruction {
            Instruction::AND => {
                wires.insert(op.output.clone(), i1.unwrap() & i2.unwrap());
            }
            Instruction::OR => {
                wires.insert(op.output.clone(), i1.unwrap() ^ i2.unwrap());
            }
            Instruction::LSHIFT => {
                wires.insert(op.output.clone(), i1.unwrap() << i2.unwrap());
            }
            Instruction::RSHIFT => {
                wires.insert(op.output.clone(), i1.unwrap() >> i2.unwrap());
            }
            _ => {}
        }
    }

    wires.get("a").unwrap_or(&9).to_string()
}

#[derive(Debug)]
pub struct Operation {
    instruction: Instruction,
    output: String,
    input1: String,
    input2: Option<String>,
}

#[derive(Debug)]
enum Instruction {
    AND,
    ASSIGN,
    LSHIFT,
    NOT,
    OR,
    RSHIFT,
}

pub fn parse(s: &String) -> Vec<Operation> {
    s.lines().map(|l| to_operation(l)).collect()
}

pub fn to_operation(line: &str) -> Operation {
    let mut it = line.split(" -> ").into_iter();
    let x = it.next().unwrap().split(" ").collect_vec();
    let output = it.next().unwrap();
    let mut input1 = x.first().unwrap();
    let op;
    let mut input2 = Some("".to_string());
    if x.len() == 1 {
        op = "ASSIGN";
    } else if x.len() == 2 {
        //NOT
        input1 = x.get(1).unwrap();
        op = x.first().unwrap()
    } else {
        op = x.get(1).unwrap();
        input2 = Some(x.get(2).unwrap().to_string());
    }

    let instruction = match op {
        "AND" => Instruction::AND,
        "ASSIGN" => Instruction::ASSIGN,
        "LSHIFT" => Instruction::LSHIFT,
        "NOT" => Instruction::NOT,
        "OR" => Instruction::OR,
        "RSHIFT" => Instruction::RSHIFT,
        _ => panic!("Wrong input. Found: {}", op),
    };

    Operation {
        input1: input1.to_string(),
        input2,
        instruction,
        output: output.to_string(),
    }
}

#[test]
fn test_parse() {
    dbg!(parse(&"dd RSHIFT 1 -> dw".to_string()));
    dbg!(parse(&"123 -> x".to_string()));
}
