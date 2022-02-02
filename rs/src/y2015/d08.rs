use std::{ops::Sub, str::Lines, time::Instant};

pub fn main() {
    let year = 2015;
    let day = 08;
    println!("Aoc Year {} Day: {:02}", year, day);
    let mut t: Instant;

    let input = std::fs::read_to_string(format!("../input/{}/{:02}.txt", year, day)).unwrap();
    dbg!(&input[..13]);
    let list = parse(&input);

    t = Instant::now();
    let res = solve_part1(list.clone());
    dbg!(t.elapsed().as_micros());
    dbg!(&res);

    t = Instant::now();
    let res2 = solve_part2(list.clone());
    dbg!(t.elapsed().as_micros());
    dbg!(&res2);
    //1342
    //2074
}

pub fn solve_part1(input: Lines) -> String {
    input
        .map(|l| {
            let mut x: usize = 0;
            let mut chars = l.chars();
            chars.next();
            chars.next_back();

            while let Some(c) = chars.next() {
                if c == '\\' {
                    let next = chars.next();
                    if next.eq(&Some('x')) {
                        chars.next();
                        chars.next();
                    }
                }
                x += 1;
            }

            l.len() - x
        })
        .fold(0, |acc, x| acc + x)
        .to_string()
}

pub fn solve_part2(input: Lines) -> String {
    input
        .map(|l| {
            let mut y: usize = 6;
            let mut chars = l.chars();
            chars.next();
            chars.next_back();

            while let Some(c) = chars.next() {
                if c == '\\' {
                    y += 1;
                    let next = chars.next();
                    if next.eq(&Some('x')) {
                        y += 3;
                        chars.next();
                        chars.next();
                    } else {
                        y += 2;
                    }
                }
                y += 1;
            }
            y - l.len()
        })
        .fold(0, |acc, x| acc + x)
        .to_string()
}

pub fn parse(s: &String) -> Lines<'_> {
    s.lines()
}

#[test]
fn test_solve1() {
    assert_eq!(
        solve_part1(parse(
            &r###"""
"abc"
"aaa\"aaa"
"\x27""###
                .to_string()
        )),
        "12".to_string()
    );
}

#[test]
fn test_solve2() {
    assert_eq!(
        solve_part2(parse(
            &r###"""
"abc"
"aaa\"aaa"
"\x27""###
                .to_string()
        )),
        "19".to_string()
    );
}
