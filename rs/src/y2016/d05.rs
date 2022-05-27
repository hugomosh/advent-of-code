use crypto::{digest::Digest, md5::Md5};
use std::io;
use std::io::Write;
use std::time::Instant;

static YEAR: i16 = 2016;
static DAY: i8 = 5;

pub fn main() {
    println!("Aoc YEAR {} DAY: {:02}", YEAR, DAY);
    let mut t: Instant;

    let input = "abbhdwsy".to_string(); //std::fs::read_to_string(format!("../input/{}/{:02}.txt", YEAR, DAY)).unwrap();
    dbg!(&input);

    /*   t = Instant::now();
    let res = solve_part1(&input);
    dbg!(t.elapsed().as_micros());
    dbg!(&res); */

    t = Instant::now();
    let res2 = solve_part2(&input);
    dbg!(t.elapsed().as_micros());
    dbg!(&res2);
}

pub fn solve_part1(input: &String) -> String {
    let mut i = 0;
    let mut res = String::from("");
    let mut sh = Md5::new();
    while res.len() < 7 {
        let new_val = input.to_string() + &i.to_string();
        sh.input_str(&new_val);
        let new_hash = sh.result_str();

        if new_hash.starts_with("00000") {
            dbg!(&new_hash);
            res.push_str(&new_hash.chars().nth(5).unwrap().to_string());
            dbg!(&res);
        }

        i += 1;
        sh.reset();
    }
    return res;
}

pub fn solve_part2(input: &String) -> String {
    let mut i = 0;
    let mut res = String::from("________");
    let mut count = 0;
    let mut sh = Md5::new();
    while count != 8 {
        let new_val = input.to_string() + &i.to_string();
        sh.input_str(&new_val);
        let new_hash = sh.result_str();

        if new_hash.starts_with("00000") {
           
            let index = *(&new_hash.chars().nth(5).unwrap()) as usize - '0' as usize;

            let new_char = &new_hash.chars().nth(6).unwrap().to_string();

            if index < 8 && res.chars().nth(index).unwrap() == '_' {
                dbg!(&new_hash, &index, &new_char);
                res.replace_range(index..index + 1, &new_char);
                //dbg!(&res);
                count += 1;
                io::stdout().flush().unwrap();
            }
        }
        print!("\rDeciphering {}. {}, {}", res, i, new_hash);

        i += 1;
        sh.reset();
    }
    return res;
}

#[test]
fn test_solve1() {
    let example1 = r#"abc"#;
    let input = &example1.to_string();
    let expected = String::from("18f47a30");

    assert_eq!(solve_part1(&input), expected);
}
#[test]
fn test_solve2() {
    let example1 = r#"abc"#;
    let input = &example1.to_string();
    let expected = String::from("05ace8e3");

    assert_eq!(solve_part2(&input), expected);
}
