use std::{collections::HashSet, str::Lines, time::Instant};

use itertools::Itertools;

pub fn main() {
    println!("Aoc Year: 2015 Day: 05");
    let mut t: Instant;

    let input = std::fs::read_to_string("../input/2015/05.txt").unwrap();
    dbg!(&input[..5]);
    let list = parse(&input);

    t = Instant::now();
    let res2 = solve_part2(list.clone());
    dbg!(t.elapsed().as_millis());
    dbg!(&res2);

    t = Instant::now();
    let res = solve_part1(list.clone());
    dbg!(t.elapsed().as_millis());
    dbg!(&res);
    /*
       assert_eq!(solve_part1(&String::from("abcdef")), String::from("609043"));
       assert_eq!(
           solve_part1(&String::from("pqrstuv")),
           String::from("1048970")
       );
    */
    assert_eq!(res, String::from("258"));
    assert_ne!(res2, String::from("63"));
}

pub fn parse(s: &String) -> Lines<'_> {
    s.lines()
}

/// "Base" set of vowels.

fn count_vowels(w: &str) -> usize {
    let base_vowels: HashSet<char> = "aeiou".chars().collect();

    w.chars().filter(|c| base_vowels.contains(c)).count()
}

fn has_repeted_letter(w: &str) -> bool {
    w.chars().tuple_windows().filter(|(x, y)| x == y).count() > 0
}

pub fn is_nice_word(w: &str) -> bool {
    /* It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements. */
    if w.contains("ab") || w.contains("cd") || w.contains("pq") || w.contains("xy") {
        return false;
    }

    let cv = count_vowels(w);
    if cv < 3 {
        return false;
    }
    return has_repeted_letter(w);
}

fn has_repeted_letter_with_one_between(w: &str) -> bool {
    w.chars()
        .tuple_windows()
        .filter(|(x, _y, z)| x == z)
        .count()
        > 0
}
fn has_repeted_pair_no_overlap(w: &str) -> bool {
    let mut iter = w.chars().tuple_windows();
    let mut s: HashSet<(char, char)> = HashSet::new();
    while let Some((x, y, z)) = iter.next() {
        //overlpaing
        if !(x == y && x == z) && s.contains(&(y, z)) {
            return true;
        }

        if !(x == y && x == z) && s.is_empty() {
            s.insert((x, y));
        }

        s.insert((y, z));
    }
    false
}

pub fn is_nice_word_pro(w: &str) -> bool {
    /*
    - It contains a pair of any two letters that appears at least twice
    in the string without overlapping,
    like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
    - It contains at least one letter which repeats with exactly one letter between them,
    like xyx, abcdefeghi (efe), or even aaa. */

    return has_repeted_pair_no_overlap(w) && has_repeted_letter_with_one_between(w);
}

pub fn solve_part1(input: Lines) -> String {
    input
        .into_iter()
        .filter(|w| is_nice_word(*w))
        .count()
        .to_string()
}

pub fn solve_part2(input: Lines) -> String {
    input
        .into_iter()
        .filter(|w| is_nice_word_pro(*w))
        .count()
        .to_string()
}

#[test]
fn t1() {
    let res = is_nice_word("ugknbfddgicrmopn");
    assert_eq!(true, res)
}
#[test]

fn t2() {
    let res = is_nice_word("aaa");
    assert_eq!(true, res)
}
#[test]

fn t3() {
    let res = is_nice_word("jchzalrnumimnmhp");
    assert_eq!(false, res)
}
#[test]

fn t4() {
    let res = is_nice_word("haegwjzuvuyypxyu");
    assert_eq!(false, res)
}
#[test]
fn t5() {
    let res = is_nice_word("dvszwmarrgswjxmb");
    assert_eq!(false, res)
}

#[test]
fn test_has_repeted_letter_with_one_between() {
    assert_eq!(has_repeted_letter_with_one_between("aaa"), true);
    assert_eq!(has_repeted_letter_with_one_between("xyx"), true);
    assert_eq!(
        has_repeted_letter_with_one_between("ieodomkazucvgmuy"),
        true
    );
    assert_eq!(
        has_repeted_letter_with_one_between("uurcxstgmygtbstg"),
        false
    );
    assert_eq!(
        has_repeted_letter_with_one_between("qjhvhtzxzqqjkmpb"),
        true
    );
    assert_eq!(has_repeted_letter_with_one_between("xxyxx"), true);
}

#[test]
fn test_has_repeted_pair_no_overlap() {
    assert_eq!(has_repeted_pair_no_overlap("aaa"), false);
    assert_eq!(has_repeted_pair_no_overlap("xyxy"), true);
    assert_eq!(has_repeted_pair_no_overlap("uurcxstgmygtbstg"), true);
    assert_eq!(has_repeted_pair_no_overlap("ieodomkazucvgmuy"), false);
    assert_eq!(has_repeted_pair_no_overlap("qjhvhtzxzqqjkmpb"), true);
    assert_eq!(has_repeted_pair_no_overlap("xxyxx"), true);
    assert_eq!(has_repeted_pair_no_overlap("axxxa"), false);
}
