use std::time::Instant;

pub fn main() {
    let year = 2015;
    let day = 10;
    println!("Aoc Year {} Day: {:02}", year, day);
    let mut t: Instant;

    //let ramon_input = "1113222113".to_string();
    let input = "1113122113".to_string();
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

fn look_and_say(mut original: String) -> String {
    let mut prev_c;

    let mut count_c = 0;
    let mut next_string = String::with_capacity(original.len());
    original.push('z'); // To avoid pushing the last element manually
    prev_c = original.chars().next().unwrap();
    for c in original.chars() {
        if prev_c == c {
            count_c += 1;
        } else {
            next_string.push_str(&count_c.to_string());
            next_string.push(prev_c);
            prev_c = c;
            count_c = 1;
        }
    }

    next_string
}
fn expand_string(input: &String, times: u32) -> String {
    let mut res = input.clone();

    for _ in 0..times {
        res = look_and_say(res);
    }
    res
}

pub fn solve_part1(input: &String) -> String {
    let res = expand_string(input, 40);
    res.len().to_string()
}

pub fn solve_part2(input: &String) -> String {
    let res = expand_string(input, 50);
    res.len().to_string()
}

#[test]
fn test_expand_string() {
    assert_eq!(expand_string(&r"1".to_string(), 1), "11".to_string());
    assert_eq!(expand_string(&r"1".to_string(), 2), "21".to_string());
    assert_eq!(expand_string(&r"1".to_string(), 3), "1211".to_string());
    assert_eq!(expand_string(&r"1".to_string(), 4), "111221".to_string());
    assert_eq!(expand_string(&r"1".to_string(), 5), "312211".to_string());
    assert_eq!(
        expand_string(&r"111221".to_string(), 1),
        "312211".to_string()
    );
}

#[test]
fn test_part1() {
    assert_eq!(
        solve_part1(&r"1113122113".to_string()),
        "360154".to_string()
    );
}
#[test]
fn test_part2() {
    assert_eq!(
        solve_part2(&r"1113122113".to_string()),
        "5103798".to_string()
    );
}
