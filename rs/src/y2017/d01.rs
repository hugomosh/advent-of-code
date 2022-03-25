use itertools::Itertools;
use std::{collections::HashSet, time::Instant};

pub fn main() {
    let year = 2017;
    let day = 01;
    println!("Aoc Year {} Day: {:02}", year, day);
    let mut t: Instant;

    let input = std::fs::read_to_string(format!("../input/{}/{:02}.txt", year, day)).unwrap();
    dbg!(&input[..13]);

    t = Instant::now();
    let res = solve_part1(&input);
    dbg!(t.elapsed().as_micros());
    dbg!(&res);

    t = Instant::now();
    let res2 = solve_part2(&input);
    dbg!(t.elapsed().as_micros());
    dbg!(&res2);
    //1342
    //152
}

pub fn solve_part1(input: &String) -> String {
    let mut res = 0;
    for (x, y) in input
        .chars()
        .map(|c| c.to_digit(10).unwrap_or(0))
        .into_iter()
        .tuple_windows()
    {
        if x == y {
            res += x;
        }
    }

    dbg!(input.chars().nth(0));

    if input.chars().nth(0).eq(&input.chars().last()) {
        res += input.chars().nth(0).unwrap().to_digit(10).unwrap_or(0);
    }

    res.to_string()
}

pub fn solve_part2(input: &String) -> String {
    let iter1 = input.chars().map(|c| c.to_digit(10).unwrap_or(0));
    let mut iter2 = input.chars().map(|c| c.to_digit(10).unwrap_or(0));
    iter2.nth(input.len() / 2 - 1);

    let mut res = 0;
    for (x, y) in iter1.zip(iter2) {
        if x == y {
            res += x;
        }
    }

    (res * 2).to_string()
}
/*
For example:

1122 produces a sum of 3 (1 + 2) because the first digit (1) matches the second digit and the third digit (2) matches the fourth digit.
1111 produces 4 because each digit (all 1) matches the next.
1234 produces 0 because no digit matches the next.
91212129 produces 9 because the only digit that matches the next one is the last digit, 9.
 */

#[test]
fn test_solve1() {
    let case1 = &r#"1122"#.to_string();
    assert_eq!(solve_part1(case1), "3".to_string());
    assert_eq!(solve_part1(&"91212129".to_string()), "9".to_string());
    assert_eq!(solve_part1(&"1111".to_string()), "4".to_string());
    assert_eq!(solve_part1(&"1234".to_string()), "0".to_string());
}

/*
For example:

1212 produces 6: the list contains 4 items, and all four digits match the digit 2 items ahead.
1221 produces 0, because every comparison is between a 1 and a 2.
123425 produces 4, because both 2s match each other, but no other digit has a match.
123123 produces 12.
12131415 produces 4.
 */
#[test]
fn test_solve2() {
    let case1 = &r#"1212"#.to_string();
    assert_eq!(solve_part2(case1), "6".to_string());
    assert_eq!(solve_part2(&"1221".to_string()), "0".to_string());
    assert_eq!(solve_part2(&"123425".to_string()), "4".to_string());
    assert_eq!(solve_part2(&"123123".to_string()), "12".to_string());
    assert_eq!(solve_part2(&"12131415".to_string()), "4".to_string());
}
