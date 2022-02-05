use std::{collections::HashMap, str::Lines, time::Instant};

use regex::Regex;

pub fn main() {
    let year = 2015;
    let day = 09;
    println!("Aoc Year {} Day: {:02}", year, day);
    let t: Instant;

    let input = std::fs::read_to_string(format!("../input/{}/{:02}.txt", year, day)).unwrap();
    dbg!(&input[..13]);
    let list = parse(&input);

    t = Instant::now();
    let res = solve_part1(list.clone());
    dbg!(t.elapsed().as_millis());
    dbg!(&res);
    /*
    t = Instant::now();
    let res2 = solve_part2(list.clone());
    dbg!(t.elapsed().as_micros());
    dbg!(&res2); */
}

#[derive(Debug, Clone)]
struct Nodes {
    name: String,
    edges: HashMap<String, u32>,
}

pub fn solve_part1(input: Lines) -> String {
    let mut nodes: HashMap<String, Nodes> = HashMap::new();
    let input_re = Regex::new(r"(\w+)\sto\s(\w+)\s=\s(\d+)").unwrap();

    for l in input {
        let c = input_re.captures(l).unwrap();
        let from = c.get(1).map_or("".to_string(), |x| x.as_str().to_string());
        let to = c.get(2).map_or("".to_string(), |x| x.as_str().to_string());
        let distance = c.get(3).map_or(0, |x| x.as_str().parse::<u32>().unwrap());

        // Get or  Create nodes if not already
        let from_v = nodes.entry(from.clone()).or_insert(Nodes {
            name: (&from).to_string(),
            edges: HashMap::new(),
        });

        from_v.edges.insert(to.clone(), distance);

        let to_v = nodes.entry(to.clone()).or_insert(Nodes {
            name: (&to).to_string(),
            edges: HashMap::new(),
        });

        // Instert edge in the corresponding place
        to_v.edges.insert(from.clone(), distance);
    }

    let mut solutions: HashMap<String, u32> = HashMap::new();

    for first_node in nodes.values() {
        // Start at any node
        let mut visited_nodes: HashMap<String, u32> = HashMap::new();
        visited_nodes.insert(first_node.name.clone(), 0);
        let mut next_node_name = first_node.name.clone();

        while visited_nodes.len() != nodes.len() {
            // Pull the shortes edge.
            let mut min_distance = u32::MIN;

            for (name, distance) in nodes.get(&next_node_name).unwrap().edges.iter() {
                if visited_nodes.contains_key(name) {
                    continue;
                }
                if *distance > min_distance {
                    min_distance = *distance;
                    next_node_name = name.clone();
                }
            }


            //Add node to visited
            visited_nodes.insert(next_node_name.clone(), min_distance);
        }
        dbg!(visited_nodes.values().fold(0, |acc, &x| acc + x));
        solutions.insert(
            first_node.name.clone(),
            visited_nodes.values().fold(0, |acc, &x| acc + x),
        );
    }
    // From vec of edges. Fold to the sum
    solutions.values().min().unwrap().to_string()
}

pub fn parse(s: &String) -> Lines<'_> {
    s.lines()
}

#[test]
fn test_solve1() {
    assert_eq!(
        solve_part1(parse(
            &r#"London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141"#
                .to_string()
        )),
        "605".to_string()
    );
}

/*
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
} */
