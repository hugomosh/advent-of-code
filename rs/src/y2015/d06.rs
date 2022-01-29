use std::{
    cmp,
    collections::{HashMap, HashSet},
    str::Lines,
    time::Instant,
};

use regex::{Match, Regex};
pub fn main() {
    println!("Aoc Year: 2015 Day: 06");
    let mut t: Instant;

    let input = std::fs::read_to_string("../input/2015/06.txt").unwrap();
    dbg!(&input[..5]);
    let list = parse(&input);

    t = Instant::now();
    let res2 = solve_part2(&list);
    dbg!(t.elapsed().as_millis());
    dbg!(&res2);

    t = Instant::now();
    let res = solve_part1(&list);
    dbg!(t.elapsed().as_millis());
    dbg!(&res);
    /*
    assert_eq!(solve_part1(&String::from("abcdef")), String::from("609043"));
    assert_eq!
        solve_part1(&String::from("pqrstuv")),
        String::from("1048970")
    );
    assert_eq!(res, String::from("543903"));
    assert_ne!(res2, String::from("14687245"));
    */
}

pub struct Operation {
    op: String,
    from: (u32, u32),
    to: (u32, u32),
}

pub fn to_operation(l: &str) -> Operation {
    let input_re =
        Regex::new(r#"(toggle|turn off|turn on)\s(\d+),(\d+)\sthrough\s(\d+),(\d+)"#).unwrap();
    let c = input_re.captures(l).unwrap();
    let internal_parse = |x: Match| x.as_str().parse::<u32>().unwrap();
    Operation {
        op: c.get(1).map_or("".to_string(), |x| x.as_str().to_string()),
        from: (
            c.get(2).map_or(0, internal_parse),
            c.get(3).map_or(0, internal_parse),
        ),
        to: (
            c.get(3).map_or(0, internal_parse),
            c.get(5).map_or(0, internal_parse),
        ),
    }
}
pub fn parse(s: &String) -> Vec<Operation> {
    s.lines().map(|l| to_operation(l)).collect()
}

pub fn solve_part1(input: &Vec<Operation>) -> String {
    let mut ligths_on: HashSet<(u32, u32)> = HashSet::new();
    for o in input {
        for x in o.from.0..o.to.0 + 1 {
            for y in o.from.1..o.to.1 + 1 {
                match o.op.as_str() {
                    "toggle" => {
                        if ligths_on.contains(&(x, y)) {
                            ligths_on.remove(&(x, y));
                        } else {
                            ligths_on.insert((x, y));
                        }
                    }
                    "turn on" => {
                        ligths_on.insert((x, y));
                    }
                    "turn off" => {
                        ligths_on.remove(&(x, y));
                    }
                    _ => {}
                }
            }
        }
    }
    ligths_on.len().to_string()
}

pub fn solve_part2(input: &Vec<Operation>) -> String {
    let mut ligths_on: HashMap<(u32, u32), u32> = HashMap::new();
    for o in input {
        for x in o.from.0..o.to.0 + 1 {
            for y in o.from.1..o.to.1 + 1 {
                let l = ligths_on.entry((x, y)).or_insert(0);
                match o.op.as_str() {
                    "toggle" => {
                        *l += 2;
                    }
                    "turn on" => {
                        *l += 1;
                    }
                    "turn off" => {
                        *l = (*l).checked_sub(1).unwrap_or(0);
                    }
                    _ => {}
                }
            }
        }
    }

    ligths_on
        .into_values()
        .fold(0, |acc, x| acc + x)
        .to_string()
}

#[test]
fn t1() {
    assert_eq!(
        solve_part1(&parse(&String::from("turn on 0,0 through 999,999"))),
        "1000000"
    );
}

#[test]
fn t2() {
    assert_eq!(
        solve_part2(&parse(&String::from("turn on 0,0 through 999,999"))),
        "1000000"
    );
    assert_eq!(
        solve_part2(&parse(&String::from("toggle 0,0 through 999,999"))),
        "2000000"
    );
    assert_eq!(
        solve_part2(&parse(&String::from(
            "toggle 0,0 through 999,999\nturn on 0,0 through 999,999\nturn off 1,1 through 999,999"
        ))),
        "2000000"
    );
    assert_eq!(
        solve_part2(&parse(&String::from("turn on 0,0 through 0,0"))),
        "1"
    );
}
