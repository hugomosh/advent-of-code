use std::{collections::HashSet, os::unix::prelude::OsStringExt, time::Instant};

use itertools::Itertools;

pub fn main() {
    let year = 2015;
    let day = 10;
    println!("Aoc Year {} Day: {:02}", year, day);
    let mut t: Instant;

    let input = "hepxcrrq".to_string();
    dbg!(&input);

    t = Instant::now();
    let res = solve_part1(&input);
    dbg!(t.elapsed().as_millis());
    dbg!(&res);

    t = Instant::now();
    let res2 = solve_part2(&input);
    dbg!(t.elapsed().as_millis());
    dbg!(&res2);
}

pub fn solve_part1(input: &String) -> String {
    let mut res: Vec<char> = input.chars().collect();
    let block_list = ['i', 'o', 'l'];
    get_next_word(&mut res);

    // See if it is valid word
    while !valid_word(&res) {
        // Get next word
        // dbg!(&res);
        get_next_word(&mut res);
        // See if it contains block chars

        // Skip blocked chars
    }

    res.iter().collect()
}

pub fn solve_part2(input: &String) -> String {
    solve_part1(&solve_part1(input))
}

fn get_next_word(w: &mut Vec<char>) {
    let i = w.len() - 1;
    let mut chars = w.iter_mut().rev();
    let mut tmp = [0u8; 4];

    loop {
        let c = chars.next();
        if c.is_none() {
            break;
        }

        let cc = add1_char(c.as_ref().unwrap());
        *c.unwrap() = cc;
        if cc != 'a' {
            break;
        }
    }
}

/* fn next(w: vec![char,8])-> vec![char,8]{
    vec![char,8] =!['a']
} */

fn valid_word(w: &Vec<char>) -> bool {
    has_sequence(w) && repeeting_pairs(w) >= 2
    //true //has_sequence(w) && repeeting_pairs(w) > 2
}

fn has_sequence(w: &Vec<char>) -> bool {
    for (a, b, c) in w.iter().tuple_windows() {
        let t = *a as u32;
        if t + 1 == *b as u32 && t + 2 == *c as u32 {
            return true;
        }
    }

    false
}

fn repeeting_pairs(w: &Vec<char>) -> u8 {
    let mut rep = HashSet::new();
    for (a, b, c) in w.iter().tuple_windows() {
        if c != a && (a == b || b == c) {
            rep.insert(b);
        }
    }
    rep.len() as u8
}

fn add1_char(c: &char) -> char {
    if *c == 'z' {
        return 'a';
    }
    std::char::from_u32(*c as u32 + 1).unwrap_or(*c)
}

#[test]
fn test_valid_word() {
    assert_eq!(valid_word(&"abcdffaa".to_string().chars().collect()), true);
    assert_eq!(valid_word(&"ghjaabcc".to_string().chars().collect()), true);
    assert_eq!(valid_word(&"hijklmmn".to_string().chars().collect()), false);
    assert_eq!(valid_word(&"abbceffg".to_string().chars().collect()), false);
}

#[test]
fn test_part1() {
    assert_eq!(
        solve_part1(&r"abcdefgh".to_string()),
        "abcdffaa".to_string()
    );
    assert_eq!(
        solve_part1(&r"ghijklmn".to_string()),
        "ghjaabcc".to_string()
    );
}
/* #[test]
fn test_part2() {
    assert_eq!(
        solve_part2(&r"1113122113".to_string()),
        "5103798".to_string()
    );
}
 */
